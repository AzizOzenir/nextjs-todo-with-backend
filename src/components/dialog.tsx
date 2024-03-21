import { todoType } from "@/types/data_types";
import { useRef, useState } from "react";

type TodoPopupProps = {
  todo: todoType | null;
  onClose: () => void; // Callback for closing the popup
  isAdd: boolean;
};

const TodoPopup = ({ todo, onClose, isAdd }: TodoPopupProps) => {
  const [title, setTitle] = useState("");
  const [importance, setImportance] = useState(0); // Default importance
  const [isDone, setisDone] = useState(todo ? todo.completed : false);
  const handleSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adding_todo = {
      title: title,
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
      window.location.reload();
    } catch (error) {
    }

    onClose();

    setTitle("");
    setImportance(0);
  };

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updating_todo = {
      id:todo?.id,
      title: title,
      importance: importance,
      isDone:isDone
    };
    try {
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: updating_todo,
        }),
      });
      window.location.reload();
    } catch (error) {
    }

    onClose();

    setTitle("");
    setImportance(0);
  };


  return (
    <div className="fixed inset-0 bg-gray-900 backdrop-blur-xl bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-lg p-8 shadow-md flex flex-col">
        <form onSubmit={(e) => {isAdd?handleSubmitAdd(e):handleSubmitUpdate(e)}}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between min-w-max gap-5 ">
              <label className="w-1/4 text-right text-gray-300 font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
          {!isAdd ? (
            <button
              id="is-done-button"
              type="button"
              onClick={(e) => setisDone(isDone)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 is-done flex items-center justify-center rounded-full px-3 py-2 text-xs font-medium">
              {isDone ? "DONE" : "NOT DONE"}
            </button>
          ) : null}
          <br />
          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
            >
           {isAdd?   "Add Todo":"Update Todo"}
            </button>
          </div>
        </form>
        <button
          onClick={(e) => onClose()}
          className="mt-4 bg-transparent border border-1 border-red-500  hover:bg-red-400 hover:bg-opacity-10 text-red-400 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoPopup;
