'use client';
import {
  Box,
  Button,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import FormCustom from '@/app/components/custom/form';
import { Delete, Edit } from '@mui/icons-material';
import { useDialogs } from '@toolpad/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
export type IDataCustom = {
  id: string;
  name: string;
};
export default function ListCustom({
  route,
  title,
  titleDialog,
}: {
  route: string;
  title: string;
  titleDialog: string;
}) {
  const [dialogForm, setDialogForm] = useState(false);
  const [dataList, setDataList] = useState<Array<IDataCustom>>([]);
  const [dataEdit, setDataEdit] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const openDialogForm = () => {
    setDialogForm(true);
  };

  const closeDialogForm = () => {
    setDialogForm(false);
    setDataEdit(null);
  };

  const dialogs = useDialogs();

  const getDatas = useCallback(async () => {
    fetch(`api/${route}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0) {
          const newDataList = data.map((item: any) => ({
            id: item.id,
            name: item.nome,
          }));
          setDataList(newDataList);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [route]);

  const rows = useMemo(() => {
    const deleteRow = async (id: string) => {
      const confirm = await dialogs.confirm('Tem certeza que deseja excluir?', {
        cancelText: 'Cancelar',
        okText: 'Excluir',
      });

      if (confirm) {
        try {
          await fetch(`api/${route}/${id}`, {
            method: 'DELETE',
          }).then((res) => res.json());

          getDatas();
        } catch (error) {
          console.error(error);
        }
      }
    };

    return dataList.map((data) => (
      <Grid2
        size={{
          xs: 12,
          sm: 6,
          md: 4,
        }}
        key={data.id}
      >
        <Box
          sx={{
            border: '1px solid lightblue',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'row',
            paddingY: '1rem',
            paddingX: '.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.2rem',
            }}
          >
            {data.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: '4px',
              columnGap: '.5rem',
            }}
          >
            <IconButton
              sx={{
                color: 'lightblue',
                backgroundColor: 'transparent',
                border: '1px solid lightblue',
                borderRadius: '4px',
              }}
              onClick={() => {
                setDataEdit(data);
                openDialogForm();
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{
                color: 'lightsalmon',
                backgroundColor: 'transparent',
                border: '1px solid lightsalmon',
                borderRadius: '4px',
              }}
              onClick={() => deleteRow(String(data.id))}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Grid2>
    ));
  }, [dataList, dialogs, getDatas, route]);

  const handleSave = async (data: IDataCustom) => {
    if (dataEdit?.id === data.id) {
      try {
        await fetch(`api/${route}/${data.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: data.name,
          }),
        }).then((res) => res.json());
        getDatas();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch(`api/${route}`, {
          method: 'POST',
          body: JSON.stringify({
            name: data.name,
          }),
        }).then((res) => res.json());
        getDatas();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getDatas();
  }, [, getDatas]);

  return (
    <>
      <Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Lista de {title}</Typography>
          <Button variant="outlined" onClick={openDialogForm}>
            Novo
          </Button>
        </Box>
        <Grid2
          container
          spacing={2}
          rowSpacing={2}
          sx={{
            marginTop: '1rem',
          }}
        >
          {rows}
        </Grid2>
      </Stack>
      <FormCustom
        titleDialog={titleDialog}
        data={dataEdit}
        openDialog={dialogForm}
        onCloseDialog={closeDialogForm}
        handleSave={handleSave}
      />
    </>
  );
}
