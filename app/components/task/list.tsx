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

import { Delete, Edit } from '@mui/icons-material';
import { useDialogs } from '@toolpad/core';
import { useMemo, useState } from 'react';
import { FormTask, IFormTask } from './form';

export default function ListTask() {
  const [dialogForm, setDialogForm] = useState(false);
  const [dataList, setDataList] = useState<Array<IFormTask>>([]);
  const [dataEdit, setDataEdit] = useState<IFormTask | null>(null);

  const openDialogForm = () => {
    setDialogForm(true);
  };

  const closeDialogForm = () => {
    setDialogForm(false);
    setDataEdit(null);
  };

  const dialogs = useDialogs();

  const deleteRow = async (id: string) => {
    const confirm = await dialogs.confirm('Tem certeza que deseja excluir?', {
      cancelText: 'Cancelar',
      okText: 'Excluir',
    });

    if (confirm) {
      setDataList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const rows = useMemo(
    () =>
      dataList.map((data) => (
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
      )),
    [dataList],
  );

  const handleSave = (data: IFormTask) => {
    if (dataEdit?.id === data.id) {
      setDataList((prev) =>
        prev.map((item) =>
          item.id === data.id ? { ...item, name: data.name } : item,
        ),
      );

      setDataEdit(null);

      return;
    } else {
      setDataList((prev) => [...prev, data]);
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
      <FormTask
        data={dataEdit}
        openDialog={dialogForm}
        onCloseDialog={closeDialogForm}
        handleSave={handleSave}
      />
    </>
  );
}
