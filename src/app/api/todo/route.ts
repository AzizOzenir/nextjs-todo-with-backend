import { todos } from "@/data/todos";
import { todoType } from "@/types/data_types";
import { randomUUID } from "crypto";
var moment = require("moment"); // require

export async function GET(request: Request, id: number) {
  const alltodos: todoType[] = todos;
  const taken_todo: todoType[] = alltodos.filter((e, i) => {
    e.id === id ? e : null;
  });

  return taken_todo[0];
}

export async function POST(request: Request, todo: todoType) {
  const alltodos: todoType[] = todos;

  const adding_todo: todoType = {
    id:Math.random(),
    name: todo.name,
    importance: todo.importance || 5,
    completed: false,
    updatedAt: moment().format(),
    createdAt: moment().format(),
  };

  return;
}

export async function UPDATE(request: Request, todo: todoType) {
  const alltodos: todoType[] = todos;
  const updateing_todo: todoType[] = alltodos.filter((e, i) => {
    if (e.id === todo.id) {
      e.name = todo.name;
      e.importance = todo.importance;
      e.completed = todo.completed;
      e.updatedAt = moment().format();
    }
  });
  return;
}
