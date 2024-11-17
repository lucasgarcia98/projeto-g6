'use server';
import { NextRequest } from 'next/server';
import prisma from '../../database/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const tarefas = await prisma.tarefa.findUnique({
    where: {
      id: +params.id,
    },
  });
  return new Response(JSON.stringify(tarefas));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  if (!id) return new Response('Id não informado', { status: 400 });

  const category = await prisma.tarefa.delete({
    where: {
      id: +id,
    },
  });

  if (category) {
    return new Response(JSON.stringify('Excluido com sucesso!'), {
      status: 200,
    });
  }

  return new Response(JSON.stringify('Não foi possível excluir'), {
    status: 400,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await req.json();
  const updated = await prisma.tarefa.update({
    where: {
      id: +id,
    },
    data: {
      ...(body.name && { nome: body.name }),
      ...(body.description && { descricao: body.description }),
      ...(body.responsible && { responsavel: body.responsible }),
      ...(body.created_date && {
        data_criacao: body.created_date,
      }),
      ...(body.expected_date && {
        data_prevista: body.expected_date,
      }),
      ...(body.finished_date && {
        data_finalizacao: body.finished_date,
      }),
      ...(body.situation_id && String(body.situation_id).length > 0
        ? { situacaoId: body.situation_id }
        : { situacaoId: null }),
      ...(body.category_id && String(body.category_id).length > 0
        ? { categoriaId: +body.category_id }
        : { categoriaId: null }),
    },
  });

  if (!updated) {
    return new Response(JSON.stringify('Não foi possível atualizar'), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify(`Tarefa ${updated.nome} atualizada com sucesso!`),
    {
      status: 200,
    },
  );
}
