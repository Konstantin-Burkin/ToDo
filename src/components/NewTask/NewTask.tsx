import React, { useState } from "react";
import styles from "./NewTask.module.css";

interface NewTaskProps {
  addTask: (task: string) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div className={styles.newTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.input}
      />
      <button onClick={handleAddTask} className={styles.button}>
        Add
      </button>
    </div>
  );
};

export default NewTask;
