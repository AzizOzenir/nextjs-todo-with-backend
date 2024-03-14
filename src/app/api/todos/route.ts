import { todos } from "@/data/todos";
import { todoType } from "@/types/data_types";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";



export async function GET(request: Request, res: NextApiResponse) {
  try {
    const alltodos: todoType[] = todos;
    return Response.json({ alltodos })
  } catch (error) {
    return  Response.json({message:"fuck"})
  }
}
