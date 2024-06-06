import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
  clearCompletedTasks: () => void;
  filterTasks: (filter: string) => void;
  currentFilter: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  removeTask,
  clearCompletedTasks,
  filterTasks,
  currentFilter,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  return (
    <div className={styles.taskList}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          toggleTaskCompletion={toggleTaskCompletion}
          removeTask={removeTask}
        />
      ))}
      <div className={styles.taskListFooter}>
        <span style={{ marginRight: "20px" }}>
          {tasks.filter((task) => !task.completed).length} items left
        </span>
        <div className={styles.filters}>
          <button
            onClick={() => filterTasks("all")}
            className={currentFilter === "all" ? styles.active : ""}
          >
            All
          </button>
          <button
            onClick={() => filterTasks("active")}
            className={currentFilter === "active" ? styles.active : ""}
          >
            Active
          </button>
          <button
            onClick={() => filterTasks("completed")}
            className={currentFilter === "completed" ? styles.active : ""}
          >
            Completed
          </button>
        </div>
        <button onClick={clearCompletedTasks} className={styles.clearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default TaskList;
