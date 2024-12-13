import React from "react";
import TaskI from "../../models/tasks/task.interface.ts";

interface TaskItemProps {
  task: TaskI;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <li
      key={task.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex space-x-4">
        <p className="text-xl text-gray-600">{task.id}</p>
        <p className="text-xl font-semibold text-gray-800">{task.title}:</p>
        <p className="text-xl font-semibold text-gray-800">
          {task.description}
        </p>
      </div>
    </li>
  );
};

export default TaskItem;
