'use client';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
      <TableRow key={data.id}>
        <TableCell colSpan={4}>{data.name}</TableCell>
        <TableCell align="right" colSpan={2}>
          <Stack
            columnGap={2}
            flexDirection={'row'}
            justifyContent={'flex-end'}
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
          </Stack>
        </TableCell>
      </TableRow>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid #ccc',
            py: '.8rem',
            px: '1rem',
            borderRadius: '10px 10px 0px 0px',
            alignItems: 'center',
          }}
        >
          <Typography>Lista de {title}</Typography>
          <Button variant="outlined" onClick={openDialogForm}>
            Novo
          </Button>
        </Box>
        <TableContainer
          sx={{
            border: '1px solid #ccc',
            borderRadius: '0px 0px 10px 10px',
            borderTop: 'none',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>Nome</TableCell>
                <TableCell align="right" colSpan={2}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
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
