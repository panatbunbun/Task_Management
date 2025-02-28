import { useState, useEffect } from "react";

const TaskForm = ({ taskToEdit, onSave }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
    updatedAt: "",
  });

  // เมื่อมีการแก้ไข task จะตั้งค่าฟอร์มตามข้อมูล
  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        due_date: taskToEdit.due_date,
        updatedAt: taskToEdit.updatedAt,
      });
    }
  }, [taskToEdit]);

  // ฟังก์ชันสำหรับการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  // ฟังก์ชันการบันทึกข้อมูล
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ทำการบันทึกข้อมูลหรือแก้ไขข้อมูล
    if (taskToEdit) {
      await fetch(`http://localhost:5000/tasks/${taskToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
    } else {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
    }

    // ตรวจสอบว่า onSave เป็นฟังก์ชันหรือไม่
    if (onSave && typeof onSave === "function") {
      onSave(); // เรียกใช้ onSave เพื่อปิดฟอร์มหรือรีเฟรชข้อมูล
    } else {
      console.error("onSave is not a function!");
    }
  };

  return (
    <div className="task-form">
      <h2>{taskToEdit ? "Edit Task" : "Add New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Task Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="due_date"
            value={taskData.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Updated At</label>
          <input
            type="datetime-local"
            name="updatedAt"
            value={taskData.updatedAt}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">{taskToEdit ? "Save Changes" : "Add Task"}</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
