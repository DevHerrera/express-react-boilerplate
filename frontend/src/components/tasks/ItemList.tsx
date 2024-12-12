import React from "react";

import TaskI from "../../models/tasks/task.interface.ts";
interface TaskItemProps {
  task: TaskI;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <li key={task.id}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </li>
  );
};

export default TaskItem;
