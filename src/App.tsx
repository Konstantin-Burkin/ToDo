import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import NewTask from "./components/NewTask/NewTask";
import TaskList from "./components/TaskList/TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const filterTasks = (filter: string) => {
    setFilter(filter);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.app}>
        <h1 className={styles.header}>todos</h1>
        <NewTask addTask={addTask} />
        <TaskList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          removeTask={removeTask}
          clearCompletedTasks={clearCompletedTasks}
          filterTasks={filterTasks}
          currentFilter={filter}
        />
      </div>
    </div>
  );
};

export default App;
