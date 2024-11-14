'use server';
import { NextRequest } from 'next/server';
import prisma from '../../database/prisma';

export async function GET(req: NextRequest) {
  const categorias = await prisma.categoria.findMany();
  return new Response(JSON.stringify(categorias));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const category = await prisma.categoria.create({
    data: {
      nome: body.name,
    },
  });
  return new Response(JSON.stringify(category));
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  if (!id) return new Response('Id não informado', { status: 400 });

  const category = await prisma.categoria.delete({
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
  const updated = await prisma.categoria.update({
    where: {
      id: +id,
    },
    data: {
      nome: body.name,
    },
  });

  if (!updated) {
    return new Response(JSON.stringify('Não foi possível atualizar'), {
      status: 400,
    });
  }

  return new Response(
    JSON.stringify(`Situação ${body.name} atualizada com sucesso!`),
    {
      status: 200,
    },
  );
}
