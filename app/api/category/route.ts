'use server';
import { NextRequest } from 'next/server';
import prisma from '../database/prisma';

export async function GET(req: NextRequest) {
  const category = await prisma.categoria.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return new Response(JSON.stringify(category));
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

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const category = await prisma.categoria.delete({
    where: {
      id: body.id,
    },
  });
  return new Response(JSON.stringify(category));
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const category = await prisma.categoria.update({
    where: {
      id: body.id,
    },
    data: {
      nome: body.name,
    },
  });
  return new Response(JSON.stringify(category));
}
