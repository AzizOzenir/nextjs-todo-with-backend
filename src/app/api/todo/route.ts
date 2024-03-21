import { todoType } from "@/types/data_types";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";
var moment = require("moment"); // require
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { todo } = await request.json();
    const clickedTodo = prisma.todo.findUnique({
      where: { id: todo.id },
    });
    return Response.json({ message: "Todo getted", todo: clickedTodo });
  } catch (e) {
    return Response.json({ message: "Error adding todo to Prisma" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  const { todo } = await request.json();

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: todo.name || "no name given",
        importance: todo.importance || 5,
        completed: todo.completed || false,
      },
    });

    return Response.json({ message: "Todo added to Prisma", todo: newTodo }); 
  } catch (error) {
    return Response.json({ message: "Error adding todo to Prisma" });
  } finally {
    await prisma.$disconnect(); 
  }
}

export async function PUT(request: Request) {
  try {
    const { todo } = await request.json();

    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        title: todo.title || false,
        importance: todo.importance || false,
        completed: todo.completed || false,
      },
    });

    return Response.json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return Response.json({ message: "Error updating todo" });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const response = await prisma.todo.delete({ where: { id: id } });

    return new Response(`Todo deleted successfully ${response}`, {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete todo", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
