import { todoType } from "@/types/data_types";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const allTodos = await prisma.todo.findMany();

    return Response.json({ todos: allTodos });
  } catch (error) {
    console.error(error);

  } finally {
    await prisma.$disconnect();
  }
}
