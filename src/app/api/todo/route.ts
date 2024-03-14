import { todos } from "@/data/todos";
import { todoType } from "@/types/data_types";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";
var moment = require("moment"); // require

export async function GET(request: Request, id: number) {
  const alltodos: todoType[] = todos;
  const taken_todo: todoType[] = alltodos.filter((e, i) => {
    e.id === id ? e : null;
  });

  return Response.json({ taken_todo: taken_todo[0] });
}

export async function POST(request: Request) {
  try {
    const {todo} = await request.json();

    const adding_todo: todoType = {
      id: todos.length + 1 ,
      name: todo.name|| "no name given",
      importance: todo.importance || 5,
      completed: false,
      updatedAt: moment().format(),
      createdAt: moment().format(),
    };
    todos.push(adding_todo);

    return Response.json({ added_todo: adding_todo });
  } catch (error) {
    Response.json({ message: error });
  }
}

export async function PUT(request: Request) {
  
  const {todo} = await request.json();
  const updated_todos: todoType[] = todos.filter((e, i) => {
    if (e.id === todo.id) {
      e.name = todo.name;
      e.importance = todo.importance;
      e.completed = todo.completed;
      e.updatedAt = moment().format();
  
      
  
    }
  });
  
  return Response.json({ message: "UPDATED",updated_todos:updated_todos });;
}
