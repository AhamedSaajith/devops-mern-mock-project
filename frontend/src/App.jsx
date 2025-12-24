import React, { useEffect, useState } from "react";
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!text) return;
    await axios.post(API, { text });
    setText("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        To-Do List with DevOps DB Test
      </h1>

      <div className="w-full max-w-md flex mb-6">
        <input
          className="flex-grow p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-3 bg-white rounded-md shadow hover:bg-gray-50 transition"
          >
            <span>{task.text}</span>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-700 font-bold text-lg"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="mt-6 text-gray-500">No tasks yet. Add one above! 🚀</p>
      )}
    </div>
  );
}

export default App;
