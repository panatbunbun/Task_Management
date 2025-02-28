import { useState, useEffect } from "react";

const TaskForm = ({ onTaskAdded, taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status: "Pending" };

    try {
      const response = taskToEdit
        ? await fetch(`http://localhost:5000/tasks/${taskToEdit.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
          })
        : await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
          });

      if (response.ok) {
        onTaskAdded();
        setTitle("");
        setDescription("");
        setTaskToEdit(null);
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="container">
      <h2>{taskToEdit ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
