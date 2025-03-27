import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

// แปลงวันที่ให้อ่านง่าย (ภาษาอังกฤษ)
const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " at " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== taskId));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleSave = () => {
    fetchTasks();
    setEditTask(null);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  return (
    <div>
      <h2>Task List</h2>
      {editTask ? (
        <TaskForm
          taskToEdit={editTask}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{formatDateTime(task.createdAt)}</td>
                  <td>{formatDateTime(task.updatedAt)}</td>
                  <td>
                    <button className="update" onClick={() => handleEdit(task)}>
                      Edit
                    </button>
                    <button className="delete" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", color: "#888" }}>
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskTable;
