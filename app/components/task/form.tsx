'use client';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import SelectCustom from '../custom/input/select';
export interface IFormTask {
  id: string;
  name: string;
  description: string;
  created_date: Date;
  expected_date: Date;
  finished_date: Date;
  responsavel: string;
  situation_id: number;
  category_id: number;
}

const initialData: IFormTask = {
  id: '',
  name: '',
  description: '',
  created_date: new Date(),
  expected_date: new Date(),
  finished_date: new Date(),
  responsavel: '',
  situation_id: 0,
  category_id: 0,
};

export function FormTask({
  data,
  openDialog,
  onCloseDialog,
  handleSave,
}: {
  data?: IFormTask | null;
  openDialog: boolean;
  onCloseDialog: () => void;
  handleSave: (data: IFormTask) => void;
}) {
  const [form, setForm] = useState<IFormTask>(initialData);

  const resetFields = useCallback(() => {
    setForm(initialData);
  }, []);

  const handleCancel = useCallback(() => {
    resetFields();
    onCloseDialog();
  }, [onCloseDialog, resetFields]);

  const handleSaveClick = useCallback(() => {
    const randNumber = Math.floor(Math.random() * 1000);
    if (form) {
      handleSave({
        id: data?.id || String(randNumber),
        name: form.name,
        description: form.description,
        created_date: form.created_date,
        expected_date: form.expected_date,
        finished_date: form.finished_date,
        responsavel: form.responsavel,
        situation_id: form.situation_id,
        category_id: form.category_id,
      });
    }

    handleCancel();
  }, [data, handleSave, form, handleCancel]);

  const isEdit = useMemo(() => !!data?.id, [data]);

  useEffect(() => {
    if (openDialog && data?.id) {
      setForm(data);
    }
  }, [openDialog, data]);

  const handleChangeField = useCallback(
    <T extends keyof IFormTask>(name: T, value: IFormTask[T]) => {
      setForm((prev: IFormTask) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setForm],
  );
  return (
    <Dialog open={openDialog} onClose={handleCancel} maxWidth="lg">
      <DialogTitle>{isEdit ? 'Editar' : 'Nova'} Tarefa</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Grid2 container spacing={2} rowSpacing={2}>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
              }}
            >
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
                value={form?.name || ''}
                onChange={(e) => handleChangeField('name', e.target.value)}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
              }}
            >
              <TextField
                autoComplete="off"
                margin="dense"
                id="name"
                label="Responsável"
                type="text"
                name="responsavel"
                fullWidth
                variant="standard"
                value={form?.responsavel || ''}
                onChange={(e) =>
                  handleChangeField('responsavel', e.target.value)
                }
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <DatePicker
                label="Data de Criação"
                value={form?.created_date}
                onChange={(e) =>
                  handleChangeField('created_date', e || new Date())
                }
                sx={{
                  width: '100%',
                }}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <DatePicker
                label="Data Prevista"
                value={form?.expected_date}
                onChange={(e) =>
                  handleChangeField('expected_date', e || new Date())
                }
                sx={{
                  width: '100%',
                }}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <DatePicker
                label="Data Finalização"
                value={form?.finished_date}
                onChange={(e) =>
                  handleChangeField('finished_date', e || new Date())
                }
                sx={{
                  width: '100%',
                }}
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <TextField
                autoComplete="off"
                margin="dense"
                id="name"
                label="Descrição"
                type="text"
                name="descricao"
                fullWidth
                variant="standard"
                multiline
                value={form?.description || ''}
                onChange={(e) =>
                  handleChangeField('description', e.target.value)
                }
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <SelectCustom
                label="Situação"
                value={String(form?.situation_id)}
                setValue={(value) => handleChangeField('situation_id', +value)}
                name="situation_id"
                options={[
                  { value: '1', label: 'Em andamento' },
                  { value: '2', label: 'Concluída' },
                ]}
                inputLabelText="Situação"
              />
            </Grid2>
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <SelectCustom
                label="Categoria"
                value={String(form?.category_id)}
                setValue={(value) => handleChangeField('category_id', +value)}
                name="category_id"
                options={[
                  { value: '1', label: 'Em andamento' },
                  { value: '2', label: 'Concluída' },
                ]}
                inputLabelText="Categoria"
              />
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button onClick={handleSaveClick}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
