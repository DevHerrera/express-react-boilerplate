// components/molecules/TaskList.tsx
import React from "react";
import TaskItem from "./ItemList.tsx";
import TaskI from "../../models/tasks/task.interface.ts";

interface TaskListProps {
  tasks: TaskI[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
