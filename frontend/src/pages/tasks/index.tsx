// pages/Tasks.tsx
import React from "react";
import TaskList from "../../components/tasks/List.tsx";
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
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Tasks;
