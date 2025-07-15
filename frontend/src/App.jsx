import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const loadTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("/tasks", { text });
    setText("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete("/tasks/" + id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text} ({task.status})
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
