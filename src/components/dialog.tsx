import { todoType } from "@/types/data_types";
import { useState } from "react";

type TodoPopupProps = {
  todo: todoType | null;
  onClose: () => void; // Callback for closing the popup
};

const TodoPopup = ({ onClose }: TodoPopupProps) => {
  const [name, setName] = useState("");
  const [importance, setImportance] = useState(0); // Default importance

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adding_todo = {
      name: name,
      importance: importance,
    };
    try {
      const response = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: adding_todo,
        }),
      });
      console.log(response.json());
      console.log("Todo added successfully");
    } catch (error) {
      console.log("an error");
    }

    onClose();

    setName("");
    setImportance(0);
  };
  return (
    <div className="fixed inset-0 bg-gray-900 backdrop-blur-xl bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-8 shadow-md flex flex-col">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between min-w-max gap-5 ">
              <label className="w-1/4 text-right text-gray-300 font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white  bg-opacity-20 hover:rounded-md focus:rounded-md"
              />
            </div>

            <div className="flex items-center justify-between min-w-max gap-5">
              <label className="w-1/4 text-right text-gray-300 font-medium">
                Importance:
              </label>
              <input
                type="number"
                id="importance"
                name="importance"
                value={importance}
                min="0"
                max="10"
                onChange={(e) => setImportance(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white  bg-opacity-20 Level hover:rounded-md focus:rounded-md"
              />
            </div>
          </div>

          <br />

          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
            >
              Add Todo
            </button>
            <button
              onClick={(e) => onClose()}
              className="mt-4 bg-transparent border border-1 border-red-500  hover:bg-red-400 hover:bg-opacity-10 text-red-400 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoPopup;
