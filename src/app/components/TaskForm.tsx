function TaskForm() {
  return (
    <>
      <form className="grid grid-cols-3 gap-5 p-5">
        <input
          type="text"
          placeholder="What are you going to do?"
          className="bg-gray-200 placeholder-gray-600 col-start-1 col-end-3 rounded-lg"></input>
        <button type="submit" className="bg-gray-300 rounded-lg">
          Add Task
        </button>
      </form>
    </>
  );
}

export default TaskForm;
