'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export default function NewSituation({
  data,
  openDialog,
  onCloseDialog,
  handleSave,
}: {
  data?: {
    id: number;
    name: string;
    situation: string;
  };
  openDialog: boolean;
  onCloseDialog: () => void;
  handleSave: (data: { id: number; name: string; situation: string }) => void;
}) {
  console.log(data);
  const [name, setName] = useState(data?.name || '');
  const [situation, setSituation] = useState(data?.situation || 'Ativo');

  return (
    <Dialog open={openDialog} onClose={onCloseDialog}>
      <DialogTitle>Criar Situação</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
        />
        <FormControlLabel
          labelPlacement="start"
          sx={{
            marginTop: '1rem',
            marginLeft: '0',
          }}
          control={
            <Switch
              checked={situation === 'Ativo'}
              onChange={(e) =>
                setSituation(e.target.checked ? 'Ativo' : 'Inativo')
              }
            />
          }
          label="Ativar situação?"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>Cancelar</Button>
        <Button
          onClick={() => {
            handleSave({
              id: 2,
              name,
              situation,
            });

            onCloseDialog();
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
