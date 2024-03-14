import { todos } from "@/data/todos";
import { todoType } from "@/types/data_types";
import { v4 as uuidv4 } from "uuid";
var moment = require("moment"); // require

export async function GET(request: Request, id: number) {
  const alltodos: todoType[] = todos;
  const taken_todo: todoType[] = alltodos.filter((e, i) => {
    e.id === id ? e : null;
  });

  return Response.json({ taken_todo: taken_todo[0] });
}

export async function POST(request: Request, todo:{name:string,importance:number}) {
  const alltodos: todoType[] = todos;

  const adding_todo: todoType = {
    id: Number(uuidv4()),
    name: todo.name,
    importance: todo.importance || 5,
    completed: false,
    updatedAt: moment().format(),
    createdAt: moment().format(),
  };
  todos.push(adding_todo);
  console.log(todos)
  return Response.json({ adding_todo: adding_todo });
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
