import { useEffect, useState } from "react";

const TaskTable = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);
  
  // ฟังก์ชันเพื่อดึงข้อมูล tasks
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // ฟังก์ชันสำหรับการลบ task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // รีเฟรชการแสดงผลหลังจากลบ task
      setTasks(tasks.filter(task => task.id !== taskId));

      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
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
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => onEdit({ ...task, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    value={task.due_date}
                    onChange={(e) => onEdit({ ...task, due_date: e.target.value })}
                  />
                </td>
                <td>{task.createdAt}</td>
                <td>{task.updatedAt}</td>
                <td>
                  <button
                    className="update"
                    onClick={() => onEdit(task)} // เรียกใช้ฟังก์ชันแก้ไข
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(task.id)} // เรียกใช้ฟังก์ชันลบ
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#888" }}>
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
