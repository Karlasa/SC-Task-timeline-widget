import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Field,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Task } from "../../types/taskTypes";
import { normalizeDate } from "../../utils/DateUtils";
import { ITaskModalProps } from "./ITaskModalProps";
import { CalendarEdit20Regular } from "@fluentui/react-icons";
import { TASK_LIMIT } from "../../constants/constants";
const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "16px",
    marginBottom: "16px",
  },

  modal: {
    maxWidth: "350px",
  },
});

const TaskModal: React.FC<ITaskModalProps> = (props: ITaskModalProps) => {
  const { tasks, setTasks } = props;
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries());

    if (!formValues.startDate || !formValues.endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: formValues.name as string,
      startDate: normalizeDate(formValues.startDate as string)
        .toISOString()
        .split("T")[0],
      endDate: normalizeDate(formValues.endDate as string)
        .toISOString()
        .split("T")[0],
    };
    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    setStartDate(undefined);
    setEndDate(undefined);
    setOpen(false);
  };

  const form = (
    <form onSubmit={handleSubmit}>
      <DialogBody>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent className={classes.content}>
          <Field label="Task name" required>
            <Input name="name" type="text" />
          </Field>

          <Field label="Start Date" required>
            <DatePicker
              required={true}
              name="startDate"
              placeholder="Select start date..."
              maxDate={endDate}
              onSelectDate={(date) => {
                if (date) {
                  setStartDate(date);
                }
              }}
            />
          </Field>
          <Field label="End Date" required>
            <DatePicker
              required={true}
              name="endDate"
              placeholder="Select end date..."
              minDate={startDate}
              onSelectDate={(date) => {
                if (date) {
                  setEndDate(date);
                }
              }}
            />
          </Field>
        </DialogContent>
        <DialogActions>
          <Button type="submit" appearance="primary">
            Add
          </Button>
        </DialogActions>
      </DialogBody>
    </form>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(event, data) => setOpen(data.open)}
      modalType="non-modal">
      <DialogTrigger disableButtonEnhancement>
        <Button
          size="large"
          appearance="transparent"
          icon={<CalendarEdit20Regular />}></Button>
      </DialogTrigger>
      <DialogSurface className={classes.modal}>
        {tasks.length >= TASK_LIMIT ? (
          <DialogBody>
            <DialogTitle>Task Limit Reached</DialogTitle>
            <DialogContent className={classes.content}>
              <div>You cannot add more than {TASK_LIMIT} tasks.</div>
            </DialogContent>
          </DialogBody>
        ) : (
          form
        )}
      </DialogSurface>
    </Dialog>
  );
};

export default TaskModal;
