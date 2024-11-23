import { Task } from "../../types/taskTypes";
import { WeekInfo } from "../../types/dateTypes";

export interface ITaskListProps {
  tasks: Task[];
  weeks: WeekInfo[];
  quartalStartDate: string;
  quartalEndDate: string;
}
