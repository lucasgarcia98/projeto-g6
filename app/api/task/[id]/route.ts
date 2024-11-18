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
      ...('name' in body && { nome: body.name }),
      ...('description' in body && { descricao: body.description }),
      ...('responsible' in body && { responsavel: body.responsible }),
      ...('created_date' in body && {
        data_criacao: body.created_date,
      }),
      ...('expected_date' in body && {
        data_prevista: body.expected_date,
      }),
      ...('finished_date' in body && {
        data_finalizacao: body.finished_date,
      }),
      ...('situation_id' in body && { situacaoId: body.situation_id }),
      ...('category_id' in body && { categoriaId: body.category_id }),
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
