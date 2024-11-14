'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function FormCustom({
  titleDialog,
  data,
  openDialog,
  onCloseDialog,
  handleSave,
}: {
  titleDialog: string;
  data?: {
    id: string;
    name: string;
  } | null;
  openDialog: boolean;
  onCloseDialog: () => void;
  handleSave: (data: { id: string; name: string }) => void;
}) {
  const [name, setName] = useState('');

  const resetFields = useCallback(() => {
    setName('');
  }, []);

  const handleCancel = useCallback(() => {
    resetFields();
    onCloseDialog();
  }, [onCloseDialog, resetFields]);

  const handleSaveClick = useCallback(() => {
    const randNumber = Math.floor(Math.random() * 1000);
    handleSave({
      id: data?.id || String(randNumber),
      name,
    });

    handleCancel();
  }, [data, handleSave, name, handleCancel]);

  const isEdit = useMemo(() => !!data?.id, [data]);

  useEffect(() => {
    if (openDialog && data?.id) {
      setName(data?.name || '');
    }
  }, [openDialog, data]);

  return (
    <Dialog open={openDialog} onClose={handleCancel}>
      <DialogTitle>
        {isEdit ? 'Editar' : 'Nova'} {titleDialog}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          autoComplete="off"
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          name="name"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button onClick={handleSaveClick}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
