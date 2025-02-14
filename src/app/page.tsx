'use client'
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import { Task } from "./types/task";
import { supabase } from "./lib/supabase";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("task-lists").select("*");
    if (error) {
      console.error("Error fetching tasks: ", error);
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (text: string) => {
    let new_Date: Date = new Date()
    let result : string = new_Date.toLocaleString('en-US')
    console.log(result)
    const { data, error } = await supabase
      .from("task-lists")
      .insert([
        {
          task: text,
          completed: false,
          updated_at: result,
        },
      ])
      .single();
    if (error) {
      console.error("Error adding task: ", error.message);
    } else {
      setTasks([...tasks, data]);
    }
  };

  const updateTask = async (id: string, text: string) => {
    const { error } = await supabase
      .from("task-lists")
      .update({ task: text, updated_at: Date.now() })
      .eq("id", id);
    if (error) {
      console.error("Error updating task: ", error.message);
    } else {
      fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("task-lists").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task: ", error.message);
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("task-lists")
      .update({ completed: !completed })
      .eq("id", id);
    if (error) {
      console.error("Error updating task: ", error.message);
    } else {
      fetchTasks();
    }
  };

  return (
    <>
      <h1 className="p-5">Todo List</h1>
      <TaskForm onAddTask={addTask}></TaskForm>
      <TaskList tasks={tasks} onDelete={deleteTask} onToggleComplete={toggleComplete} onUpdate={updateTask}></TaskList>
    </>
  );
}
