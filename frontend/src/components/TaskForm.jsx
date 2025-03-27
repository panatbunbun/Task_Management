import { useState, useEffect } from "react";

const TaskForm = ({ taskToEdit, onSave, onCancel }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      const formatForDateTimeLocal = (value) =>
        value ? new Date(value).toISOString().slice(0, 16) : "";

      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        due_date: taskToEdit.due_date,
        updatedAt: formatForDateTimeLocal(taskToEdit.updatedAt),
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = taskToEdit
      ? `http://localhost:5000/tasks/${taskToEdit.id}`
      : "http://localhost:5000/tasks";
    const method = taskToEdit ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (typeof onSave === "function") onSave();
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {taskToEdit ? "Edit Task" : "Add New Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Updated At</label>
          <input
            type="datetime-local"
            name="updatedAt"
            value={taskData.updatedAt}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {taskToEdit ? "Save Changes" : "Add Task"}
          </button>
          {taskToEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
