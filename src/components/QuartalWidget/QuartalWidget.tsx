import { useState } from "react";
import { getQuarterInfo } from "../../utils/DateUtils";
import QuartalHeader from "../QuartalHeader";
import TaskList from "../TaskList";
import TaskModal from "../TaskModal";
import MockTasks from "../../data/mockTasks.json";
import { Task } from "../../types/taskTypes";
import { TASK_LIMIT } from "../../constants/constants";
import {
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
} from "@fluentui/react-components";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  table: {
    width: "auto",
    margin: "auto",
  },
  scrollWrapper: {
    overflowY: "auto",
  },
  headerRow: {
    border: "none",
  },
  monthHeader: {
    fontWeight: tokens.fontWeightSemibold,
    ":nth-child(odd)": {
      backgroundColor: tokens.colorNeutralBackground4,
    },
    ":nth-child(even)": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  monthTitle: {
    textAlign: "center",
    width: "100%",
  },
  taskName: {
    backgroundColor: tokens.colorNeutralBackground2,
    fontSize: tokens.fontSizeBase200,
    minWidth: "150px",
  },
  taskDate: {
    backgroundColor: tokens.colorNeutralBackground2,
    fontSize: tokens.fontSizeBase200,
  },
  weekHeader: {
    borderRightColor: tokens.colorNeutralStroke2,
    borderRightWidth: "1px",
    borderRightStyle: "solid",
  },
  weekHeaderTitle: {
    minWidth: "20px",
    textAlign: "center",
    width: "100%",
    fontSize: tokens.fontSizeBase200,
  },
});

const QuartalWidget: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MockTasks.slice(0, TASK_LIMIT));
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const quarterInfo = getQuarterInfo(currentDate.toISOString());

  const handleNextQuartal = () => {
    const newDate = new Date(quarterInfo.endDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handlePrevQuartal = () => {
    const newDate = new Date(quarterInfo.startDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const monthsHeader = quarterInfo.weeks.reduce(
    (acc: JSX.Element[], { month }, index, array) => {
      if (index === 0 || array[index - 1].month !== month) {
        const monthWeeks = array
          .slice(index)
          .filter((week) => week.month === month).length;
        acc.push(
          <TableHeaderCell
            style={{ width: `${35 * monthWeeks}px` }}
            className={classes.monthHeader}
            key={month}
            colSpan={monthWeeks}>
            <div className={classes.monthTitle}>{month}</div>
          </TableHeaderCell>
        );
      }
      return acc;
    },
    []
  );

  return (
    <div className={classes.root}>
      <QuartalHeader
        quarter={quarterInfo.quarter}
        year={quarterInfo.year}
        nextQuarter={handleNextQuartal}
        previousQuarter={handlePrevQuartal}
      />
      <div className={classes.scrollWrapper}>
        <Table size="small" className={classes.table}>
          <TableHeader>
            <TableRow className={classes.headerRow}>
              <TableHeaderCell colSpan={3}>
                <TaskModal tasks={tasks} setTasks={setTasks} />
              </TableHeaderCell>
              {monthsHeader}
            </TableRow>
            <TableRow>
              <TableHeaderCell className={classes.taskName}>
                Task name
              </TableHeaderCell>
              <TableHeaderCell className={classes.taskDate}>
                Start date
              </TableHeaderCell>
              <TableHeaderCell className={classes.taskDate}>
                End date
              </TableHeaderCell>
              {quarterInfo.weeks.map((week) => (
                <TableHeaderCell
                  className={classes.weekHeader}
                  key={week.weekNumber}>
                  <div className={classes.weekHeaderTitle}>
                    {week.weekNumber}
                  </div>
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TaskList
            tasks={tasks}
            weeks={quarterInfo.weeks}
            quartalStartDate={quarterInfo.startDate}
            quartalEndDate={quarterInfo.endDate}
          />
        </Table>
      </div>
    </div>
  );
};

export default QuartalWidget;
