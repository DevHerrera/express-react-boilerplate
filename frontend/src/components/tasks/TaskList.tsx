import React from "react";
import TaskItem from "./TaskItem.tsx";
import TaskI from "../../models/tasks/task.interface.ts";

interface TaskListProps {
  tasks: TaskI[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
