// hooks/useTasks.ts
import { useState, useEffect } from "react";
import axios from "axios";
import TaskI from "../../models/tasks/task.interface";

interface UseTasksResponse {
  tasks: TaskI[];
  error: Error | null;
  loading: boolean;
}

const useTasks = (): UseTasksResponse => {
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3080/tasks");
        setTasks(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return { tasks, error, loading };
};

export default useTasks;
