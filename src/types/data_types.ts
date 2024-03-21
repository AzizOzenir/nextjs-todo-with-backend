export interface todoType {
  id: number;
  title: string;
  completed: boolean;
  importance: number;
  createdAt: Date;
  updatedAt: Date;
}


export type OpenState = {
  isOpen: boolean;
  isAdd: boolean;
  todo:todoType |null
};