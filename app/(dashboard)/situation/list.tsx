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
import React, { useState } from 'react';
import NewSituation from './new';

export default function ListSituation() {
  const [dialogNewForm, setDialogNewForm] = useState(false);
  const [dataList, setDataList] = useState<Array<React.ReactNode>>([]);
  const [dataEdit, setDataEdit] = useState<{
    id: number;
    name: string;
    situation: string;
  }>();
  const handleDialogForm = () => {
    setDialogNewForm((prev) => !prev);
  };

  const TableRowCustomized = (data: {
    id: number;
    name: string;
    situation: string;
  }) => (
    <TableRow key={1}>
      <TableCell colSpan={4}>{data.name}</TableCell>
      <TableCell colSpan={4}>{data.situation}</TableCell>
      <TableCell align="right" colSpan={2}>
        <Stack columnGap={2} flexDirection={'row'} justifyContent={'flex-end'}>
          <IconButton
            sx={{
              color: 'lightblue',
              backgroundColor: 'transparent',
              border: '1px solid lightblue',
              borderRadius: '4px',
            }}
            onClick={() => {
              setDataEdit(data);
              handleDialogForm();
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
          >
            <Delete />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const handleSave = (data: {
    id: number;
    name: string;
    situation: string;
  }) => {
    const newRow = TableRowCustomized(data);

    setDataList((prev) => [...prev, newRow]);
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
          <Typography>Lista de situações</Typography>
          <Button variant="outlined" onClick={handleDialogForm}>
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
                <TableCell colSpan={4}>Situação</TableCell>
                <TableCell align="right" colSpan={2}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{dataList.map((row) => row)}</TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <NewSituation
        data={dataEdit}
        openDialog={dialogNewForm}
        onCloseDialog={handleDialogForm}
        handleSave={handleSave}
      />
    </>
  );
}
