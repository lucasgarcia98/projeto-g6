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
import { SaveType } from './list';
export interface IFormTask {
  id: string | null;
  name: string | null;
  description: string | null;
  created_date: Date | null;
  expected_date: Date | null;
  finished_date: Date | null;
  responsible: string | null;
  situation_id: string | null;
  category_id: string | null;
}

const initialData: IFormTask = {
  id: '',
  name: '',
  description: '',
  created_date: new Date(),
  expected_date: null,
  finished_date: null,
  responsible: '',
  situation_id: '',
  category_id: '',
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
  handleSave: (data: SaveType) => void;
}) {
  const [form, setForm] = useState<IFormTask>(initialData);
  const [errors, setErros] = useState<
    Omit<
      IFormTask,
      'id' | 'created_date' | 'expected_date' | 'finished_date'
    > & {
      created_date?: string;
      expected_date?: string;
      finished_date?: string;
    }
  >({
    name: '',
    description: '',
    created_date: '',
    expected_date: '',
    finished_date: '',
    responsible: '',
    situation_id: '',
    category_id: '',
  });
  const [optionsSituations, setOptionsSituations] = useState<Array<any>>([]);
  const [optionsCategories, setOptionsCategories] = useState<Array<any>>([]);

  const resetFields = useCallback(() => {
    setForm(initialData);
  }, []);

  const handleCancel = useCallback(() => {
    resetFields();
    onCloseDialog();
  }, [onCloseDialog, resetFields]);

  const handleSaveClick = useCallback(() => {
    if (form) {
      handleSave({
        ...(data?.id && { id: data.id }),
        name: form.name,
        description: form.description,
        created_date: form.created_date,
        expected_date: form.expected_date,
        finished_date: form.finished_date,
        responsible: form.responsible,
        situation_id:
          typeof form.situation_id === 'string' &&
          form.situation_id?.length === 0
            ? null
            : form.situation_id,
        category_id: form.category_id,
      });
    }

    handleCancel();
  }, [data, handleSave, form, handleCancel]);

  const isEdit = useMemo(() => !!data?.id, [data]);

  const fillSituations = useCallback(async () => {
    try {
      const situations = await fetch('api/situation').then((res) => res.json());
      setOptionsSituations(
        situations.map((item: any) => ({ value: item.id, label: item.nome })),
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fillCategories = useCallback(async () => {
    try {
      const categories = await fetch('api/category').then((res) => res.json());

      setOptionsCategories(
        categories.map((item: any) => ({ value: item.id, label: item.nome })),
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (openDialog) {
      fillSituations();
      fillCategories();

      if (data?.id) {
        console.log(data);
        setForm(data);
      }
    }
  }, [openDialog, data, fillSituations, fillCategories]);

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
                required
                error={!!errors.name}
                helperText={errors.name}
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
                name="responsible"
                fullWidth
                variant="standard"
                value={form?.responsible || ''}
                onChange={(e) =>
                  handleChangeField('responsible', e.target.value)
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
                onChange={(e) => handleChangeField('created_date', e || null)}
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
                setValue={(value) =>
                  handleChangeField('situation_id', value || '')
                }
                name="situation_id"
                options={optionsSituations}
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
                setValue={(value) =>
                  handleChangeField('category_id', value || '')
                }
                name="category_id"
                options={optionsCategories}
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
