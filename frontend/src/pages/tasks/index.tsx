// pages/Tasks.tsx
import React from "react";
import TaskList from "../../components/tasks/TaskList.tsx";
import useTasks from "../../hooks/tasks/useTasks.tsx";

const Tasks = () => {
  const { tasks, error, loading } = useTasks();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1 class="mt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Task manager
      </h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
