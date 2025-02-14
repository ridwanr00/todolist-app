import React from "react";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onUpdate: (id: string, text: string) => void;
}

function TaskList({ tasks, onDelete, onToggleComplete, onUpdate }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
          </span>
          <button onClick={() => onToggleComplete(task.id, task.completed)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button onClick={() => onUpdate(task.id, task.text)}>
            {task.text ? 'Update' : ''}
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
