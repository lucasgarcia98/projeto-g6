'use server';
import { NextRequest } from 'next/server';
import prisma from '../database/prisma';

export async function GET(req: NextRequest) {
  const situations = await prisma.situacao.findMany();
  return new Response(JSON.stringify(situations));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const situation = await prisma.situacao.create({
    data: {
      nome: body.name,
    },
  });
  return new Response(JSON.stringify(situation));
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const situation = await prisma.situacao.delete({
    where: {
      id: body.id,
    },
  });
  return new Response(JSON.stringify(situation));
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const situation = await prisma.situacao.update({
    where: {
      id: body.id,
    },
    data: {
      nome: body.name,
    },
  });
  return new Response(JSON.stringify(situation));
}
