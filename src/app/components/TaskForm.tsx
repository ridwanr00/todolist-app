"use client";
import React, { useState } from "react";

interface TaskFormProps {
    onAddTask: (text: string) => void;
}

function TaskForm({onAddTask} : TaskFormProps) {
  const [task, setTask] = useState("");

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
        onAddTask(task)
        setTask('')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5 p-5">
        <input
          id="add-task"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you going to do?"
          className="bg-gray-200 placeholder-gray-600 col-start-1 col-end-3 rounded-lg p-2"
        ></input>
        <button type="submit" className="bg-gray-300 rounded-lg">
          Add Task
        </button>
      </form>
    </>
  );
}

export default TaskForm;
