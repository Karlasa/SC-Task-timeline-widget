import { Task } from "../../types/taskTypes";

export interface ITaskModalProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
