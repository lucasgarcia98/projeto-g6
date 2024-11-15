'use server';
import { NextRequest } from 'next/server';
import prisma from '../database/prisma';

export async function GET(req: NextRequest) {
  const tasks = await prisma.tarefa.findMany({
    include: {
      situacao: {
        select: {
          nome: true,
        },
      },
      categoria: {
        select: {
          nome: true,
        },
      },
    },

    orderBy: {
      id: 'asc',
    },
  });
  return new Response(JSON.stringify(tasks));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const task = await prisma.tarefa.create({
    data: {
      nome: body.name,
      descricao: body.description,
      responsavel: body.responsible,
      data_criacao: body.created_date,
      data_prevista: body.expected_date || null,
      data_finalizacao: body.finished_date || null,
      ...(body.situation_id && { situacaoId: body.situation_id }),
      ...(body.category_id && { categoriaId: body.category_id }),
    },
  });
  return new Response(JSON.stringify(task));
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const task = await prisma.tarefa.delete({
    where: {
      id: body.id,
    },
  });
  return new Response(JSON.stringify(task));
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const task = await prisma.tarefa.update({
    where: {
      id: body.id,
    },
    data: {
      nome: body.name,
    },
  });
  return new Response(JSON.stringify(task));
}
