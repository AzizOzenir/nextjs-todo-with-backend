"use client";
import TodoPopup from "@/components/dialog";
import ImportancyCircle from "@/components/importancy_circle";
import { todoType } from "@/types/data_types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<todoType[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("/api/todos");
        const data = await res.json();
        setTodos(data.alltodos);
      } catch {
        console.log("Failed to load todos.");
      }
    };
    fetchTodos();
  }, []);

  const updateDone = async (todo: todoType) => {
    todo.completed = !todo.completed;
    try {
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todo,
        }),
      });
      console.log(response.json());
      console.log("Todo added successfully");
    } catch (error) {
      console.log("an error");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-40 p-24">
      <style jsx>{``}</style>
      <button
        onClick={(e) => setIsOpen(!isOpen)}
        className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-br rounded-lg shadow-md py-2 px-4 font-medium focus:outline-none"
      >
        ADD NEW
      </button>
      {isOpen && <TodoPopup todo={null} onClose={() => setIsOpen(false)} />}
      {todos.length !== 0 ? (
        <table className="table shadow-xl rounded-lg overflow-hidden w-[1000px]">
          <thead className="text-white bg-gradient-to-r from-purple-500 to-blue-500">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Importancy
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                Last Update
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-wider">
                IsDone
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {todos.map((todo, i) => (
              <tr
                key={i}
                className="hover:bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg"
              >
                <td className="px-6 py-4 text-left text-sm leading-5 font-medium">
                  {todo.id}
                </td>
                <td className="px-6 py-4 text-left text-sm leading-5 font-medium">
                  {todo.name}
                </td>
                <td className="px-6 py-4 text-left text-sm leading-5 font-medium">
                  <ImportancyCircle number={todo.importance} />{" "}
                </td>
                <td className="px-6 py-4 text-left text-sm leading-5 font-medium">
                  {todo.updatedAt}
                </td>
                <td className="px-6 py-4 text-left text-sm leading-5 font-medium">
                  <button
                    id="is-done-button"
                    type="button"
                    onClick={(e) => updateDone(todo)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 is-done flex items-center justify-center rounded-full px-3 py-2 text-xs font-medium"
                  >
                    {todo.completed ? "DONE" : "NOT DONE YET"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </main>
  );
}
