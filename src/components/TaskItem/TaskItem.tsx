import React from "react";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  id: number;
  text: string;
  completed: boolean;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  text,
  completed,
  toggleTaskCompletion,
  removeTask,
}) => {
  const handleToggleCompletion = () => {
    toggleTaskCompletion(id);
  };

  const handleRemoveTask = () => {
    removeTask(id);
  };

  return (
    <div className={styles.taskItem}>
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleCompletion}
          className={styles.checkbox}
        />
        <span className={styles.customCheckbox}>
          {completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4caf50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>
      </label>
      <span
        className={`${styles.taskText} ${completed ? styles.completed : ""}`}
      >
        {text}
      </span>
      <button onClick={handleRemoveTask} className={styles.removeButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" stroke="gray"></circle>
          <line x1="15" y1="9" x2="9" y2="15" stroke="gray"></line>
          <line x1="9" y1="9" x2="15" y2="15" stroke="gray"></line>
        </svg>
      </button>
    </div>
  );
};

export default TaskItem;
