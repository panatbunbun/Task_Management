import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import { useState } from "react";

const Home = () => {
  const [reload, setReload] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <div className="container">
      <h1>Task Management System</h1>
      <TaskForm onTaskAdded={() => setReload(!reload)} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <TaskTable key={reload} onEdit={setTaskToEdit} />
    </div>
  );
};

export default Home;
