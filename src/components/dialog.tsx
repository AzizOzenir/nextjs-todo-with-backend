import { todoType } from "@/types/data_types";
import { useState } from "react";

type TodoPopupProps = {
  todo: todoType | null;
  onClose: () => void; // Callback for closing the popup
};

const TodoPopup = ({ todo, onClose }: TodoPopupProps) => {
  const [name, setName] = useState("");
  const [importance, setImportance] = useState(0); // Default importance

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/todo",{method:"POST"});
      
      
    } catch {
      console.log("Failed to load todos.");
    }
    //    onAddTodo(newTodo);
    setName("");
    setImportance(0);
  };
  return (
    <div className="fixed inset-0 bg-gray-900 backdrop-blur-xl  bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-4 shadow-md">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label htmlFor="importance">
            Importance:
            <input
              type="number"
              id="importance"
              value={importance}
              min="0"
              max="10"
              onChange={(e) => setImportance(parseInt(e.target.value, 10))}
            />
          </label>
          <br />
          <button type="submit">Add Todo</button>
        </form>

        <button
          onClick={(e) => onClose()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoPopup;
