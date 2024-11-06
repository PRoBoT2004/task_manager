import React, { useState } from 'react';
import TaskList from './TaskList';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', subtasks: [] });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'Low', subtasks: [] });
    }
  };

  const handleEditTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-400 text-gray-900'}`}>
      <header className="flex items-center justify-between px-6 py-4 text-white bg-gray-900">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <button onClick={handleToggleDarkMode} className="px-4 py-2 bg-blue-500 rounded">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main className="container px-4 py-8 mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter task title"
            className="w-full p-2 mb-2 border rounded"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Enter task description"
            className="w-full p-2 mb-2 border rounded"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            className="w-full p-2 mb-2 border rounded"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
          />
          <select
            name="priority"
            className="w-full p-2 mb-4 border rounded"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleAddTask} className="px-4 py-2 text-white bg-green-500 rounded">Add Task</button>
        </div>
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
};

export default TaskManager;
