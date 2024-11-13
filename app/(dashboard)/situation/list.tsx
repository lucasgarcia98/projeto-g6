'use client';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import React from 'react';

const data: Array<React.ReactNode> = [
  <TableRow key={1}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
  <TableRow key={2}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
  <TableRow key={3}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
  <TableRow key={4}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
  <TableRow key={5}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
  <TableRow key={6}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
  <TableRow key={7}>
    <TableCell component="th" scope="row">
      Cupcake
    </TableCell>
    <TableCell align="right">305</TableCell>
    <TableCell align="right">3.7</TableCell>
    <TableCell align="right">67</TableCell>
    <TableCell align="right">4.3</TableCell>
  </TableRow>,
];
export default function ListSituation() {
  const router = useRouter();

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #ccc',
          py: '.8rem',
          px: '1rem',
          borderRadius: '10px 10px 0px 0px',
        }}
      >
        <Typography>Lista de situações</Typography>
        <Button
          variant="outlined"
          onClick={() => router.push('/situation/new')}
        >
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
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data.map((row) => row)}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
