import { useState, useEffect } from "react";
import TaskForm from "./TaskForm"; // ฟอร์มที่ใช้เพิ่มและแก้ไข task

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

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
      setTasks(tasks.filter((task) => task.id !== taskId));

      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  // ฟังก์ชันสำหรับการเลือก task แก้ไข
  const handleEdit = (task) => {
    setEditTask(task); // ตั้งค่า task ที่ต้องการแก้ไข
  };

  // ฟังก์ชันที่รับจากฟอร์มเมื่อบันทึกการแก้ไข
  const handleSave = () => {
    // รีเฟรชการดึงข้อมูลเมื่อบันทึกการแก้ไข
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
    setEditTask(null); // ปิดฟอร์มแก้ไข
  };

  return (
    <div>
      <h2>Task List</h2>
      {editTask ? (
        <TaskForm taskToEdit={editTask} onSave={handleSave} />
      ) : (
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
                  <td>{task.status}</td>
                  <td>{task.due_date}</td>
                  <td>{task.createdAt}</td>
                  <td>{task.updatedAt}</td>
                  <td>
                    <button
                      className="update"
                      onClick={() => handleEdit(task)} // เรียกใช้ handleEdit เพื่อแก้ไข task
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(task.id)} // เรียกใช้ handleDelete เพื่อลบ task
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
      )}
    </div>
  );
};

export default TaskTable;
