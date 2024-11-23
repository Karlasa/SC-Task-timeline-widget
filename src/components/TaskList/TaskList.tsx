import { useMemo } from "react";
import { ITaskListProps } from "./ITaskListProps";
import { hasMatchingDate } from "../../utils/DateUtils";
import {
  TableBody,
  TableCell,
  TableRow,
  tokens,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  activeWeek: {
    backgroundColor: tokens.colorBrandForeground2,
  },
  week: {
    borderRightColor: tokens.colorNeutralStroke2,
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderLeftColor: tokens.colorNeutralStroke2,
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
  },
});

const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
  const { tasks, weeks, quartalStartDate, quartalEndDate } = props;
  const classes = useStyles();
  const TasksData = useMemo(() => {
    return tasks.map((task) => {
      let matchingWeeks = new Array(weeks.length).fill(false);
      if (
        hasMatchingDate(
          task.startDate,
          task.endDate,
          quartalStartDate,
          quartalEndDate
        )
      ) {
        weeks.forEach((week, index) => {
          if (
            hasMatchingDate(
              task.startDate,
              task.endDate,
              week.startDate,
              week.endDate
            )
          ) {
            matchingWeeks[index] = true;
          }
        });
      }
      return {
        task,
        matchingWeeks,
      };
    });
  }, [tasks, weeks, quartalStartDate, quartalEndDate]);

  return (
    <TableBody>
      {TasksData.map((taskData) => {
        const { task, matchingWeeks } = taskData;
        return (
          <TableRow key={task.id}>
            <TableCell>{task.name}</TableCell>
            <TableCell>
              {new Date(task.startDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{new Date(task.endDate).toLocaleDateString()}</TableCell>
            {matchingWeeks.map((isMatching, index) => {
              return (
                <TableCell
                  key={index}
                  className={
                    isMatching ? classes.activeWeek : classes.week
                  }></TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TaskList;
