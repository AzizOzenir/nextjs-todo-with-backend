import { todoType } from "@/types/data_types";

export const todos: todoType[] = [
  {
    id: 1,
    completed: false,
    createdAt: "Sun Oct 23 2022",
    updatedAt: "Sun Oct 23 2022",
    name: "Its the first",
    importance: 2,
  },
  {
    id: 2,
    completed: false,
    createdAt: "Sun Oct 23 2023",
    updatedAt: "Sun Oct 23 2023",
    name: "Its the second",
    importance: 7,
  },
  {
    id: 3,
    completed: true,
    createdAt: new Date(2021, 9, 3).toDateString(),
    updatedAt: new Date(2023, 9, 3).toDateString(),
    name: "Its the done one",
    importance: 10,
  },
];
