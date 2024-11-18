'use client';
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import { useDialogs } from '@toolpad/core';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormTask, IFormTask } from './form';
type DataListType = IFormTask & {
  situation?: {
    name?: string;
  };
  category?: {
    name?: string;
  };
};

export type SaveType = Omit<IFormTask, 'id'> & {
  id?: string;
};

export default function ListTask() {
  const [dialogForm, setDialogForm] = useState(false);
  const [dataList, setDataList] = useState<Array<DataListType>>([]);
  const [dataEdit, setDataEdit] = useState<IFormTask | null>(null);
  const [loading, setLoading] = useState(true);

  const openDialogForm = () => {
    setDialogForm(true);
  };

  const closeDialogForm = () => {
    setDialogForm(false);
    setDataEdit(null);
  };

  const dialogs = useDialogs();

  const getTasks = useCallback(async () => {
    setLoading(true);
    fetch(`api/task`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0) {
          const newDataList = data.map((item: any) => ({
            id: item.id,
            name: item.nome,
            description: item.descricao,
            created_date: new Date(item.data_criacao),
            expected_date: item?.data_prevista && new Date(item.data_prevista),
            finished_date:
              item?.data_finalizacao && new Date(item.data_finalizacao),
            responsible: item.responsavel,
            situation: {
              name: item.situacao?.nome,
            },
            category: {
              name: item.categoria?.nome,
            },
            situation_id: item.situacaoId,
            category_id: item.categoriaId,
          }));

          setDataList(newDataList);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getTasks();
  }, [, getTasks]);

  const rows = useMemo(() => {
    const deleteRow = async (id: string) => {
      setLoading(true);
      const confirm = await dialogs.confirm('Tem certeza que deseja excluir?', {
        cancelText: 'Cancelar',
        okText: 'Excluir',
      });

      if (confirm) {
        try {
          const deleteById = await fetch(`api/task/${id}`, {
            method: 'DELETE',
          }).then((res) => res.json());

          console.log(deleteById);
          getTasks().then(() => setLoading(false));
        } catch (error) {
          console.error(error);
        }
      }
    };

    return dataList.map((data) => (
      <Grid2
        size={{
          xs: 12,
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
          <Stack>
            <Typography
              sx={{
                fontSize: '1.2rem',
              }}
            >
              {data.name}
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
              }}
            >
              {data.description}
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
              }}
            >
              {data?.created_date &&
                `Criada em ${format(new Date(data.created_date), 'dd/MM/yyyy')}`}
            </Typography>
            {data?.expected_date && (
              <Typography
                sx={{
                  fontSize: '1rem',
                }}
              >
                Prevista para{' '}
                {format(new Date(data.expected_date), 'dd/MM/yyyy')}
              </Typography>
            )}
            {data?.finished_date && (
              <Typography
                sx={{
                  fontSize: '1rem',
                }}
              >
                Finalizada em{' '}
                {format(new Date(data.finished_date), 'dd/MM/yyyy')}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: '1rem',
              }}
            >
              Responsável: {data.responsible}
            </Typography>

            <Typography
              sx={{
                fontSize: '1rem',
              }}
            >
              Situação:{' '}
              {data?.situation?.name &&
              String(data?.situation?.name)?.length > 0
                ? data?.situation?.name
                : 'Nenhuma situação'}
            </Typography>

            <Typography
              sx={{
                fontSize: '1rem',
              }}
            >
              Categoria:{' '}
              {data?.category?.name && String(data?.category?.name)?.length > 0
                ? data?.category?.name
                : 'Nenhuma categoria'}
            </Typography>
          </Stack>

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
  }, [dataList, dialogs, getTasks]);

  const handleSave = async (data: SaveType) => {
    setLoading(true);
    if (dataEdit && dataEdit?.id === data?.id) {
      try {
        const updateById = await fetch(`api/task/${data.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            ...(dataEdit.name !== data.name && { name: data.name }),
            ...(dataEdit.description !== data.description && {
              description: data.description,
            }),
            ...(dataEdit.created_date !== data.created_date && {
              created_date: data.created_date,
            }),
            ...(dataEdit.expected_date !== data.expected_date && {
              expected_date: data.expected_date,
            }),
            ...(dataEdit.finished_date !== data.finished_date && {
              finished_date: data.finished_date,
            }),
            ...(dataEdit.responsible !== data.responsible && {
              responsible: data.responsible,
            }),
            ...(dataEdit.situation_id !== data.situation_id && {
              situation_id: data.situation_id,
            }),
            ...(dataEdit.category_id !== data.category_id && {
              category_id: data.category_id,
            }),
          }),
        }).then((res) => res.json());
        console.log(updateById);
      } catch (error) {
        console.error(error);
      }
      getTasks().then(() => setLoading(false));
    } else {
      try {
        const create = await fetch(`api/task`, {
          method: 'POST',
          body: JSON.stringify({
            name: data.name,
            description: data.description,
            created_date: data.created_date,
            expected_date: data.expected_date,
            finished_date: data.finished_date,
            responsible: data.responsible,
            situation_id: data.situation_id,
            category_id: data.category_id,
          }),
        }).then((res) => res.json());
        console.log(create);
      } catch (error) {
        console.error(error);
      }
      getTasks().then(() => setLoading(false));
    }
  };

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
          <Typography>Lista de Tarefas</Typography>
          <Button variant="outlined" onClick={openDialogForm}>
            Novo
          </Button>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
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
        )}
      </Stack>
      <FormTask
        data={dataEdit}
        openDialog={dialogForm}
        onCloseDialog={closeDialogForm}
        handleSave={handleSave}
      />
    </>
  );
}
