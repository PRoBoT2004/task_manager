import React, { useState } from 'react';

const Task = ({ task, onEdit, onComplete, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [subtasks, setSubtasks] = useState(task.subtasks || []); // Manage subtasks
  const [newSubtask, setNewSubtask] = useState('');

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, { id: Date.now(), title: newSubtask, completed: false }]);
      setNewSubtask('');
    }
  };

  const handleCompleteSubtask = (subtaskId) => {
    setSubtasks(subtasks.map(subtask => (subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask)));
  };

  const handleDeleteSubtask = (subtaskId) => {
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
  };

  return (
    <div className={`p-4 mb-4 rounded shadow ${task.completed ? 'line-through bg-gray-300' : 'bg-slate-700'}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            className="w-full p-2 mb-2 border rounded"
            value={editedTask.title}
            onChange={handleEditChange}
          />
          <textarea
            name="description"
            className="w-full p-2 mb-2 border rounded"
            value={editedTask.description}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="dueDate"
            className="w-full p-2 mb-2 border rounded"
            value={editedTask.dueDate}
            onChange={handleEditChange}
          />
          <button onClick={handleSaveEdit} className="px-4 py-2 mr-2 text-white bg-green-500 rounded">Save</button>
          <button onClick={handleCancelEdit} className="px-4 py-2 text-white bg-red-500 rounded">Cancel</button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <div className="mt-2">
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 mr-2 text-white bg-yellow-500 rounded">Edit</button>
            <button onClick={() => onComplete(task.id)} className={`mr-2 px-4 py-2 ${task.completed ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded`}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => onDelete(task.id)} className="px-4 py-2 text-white bg-red-500 rounded">Delete</button>
          </div>

          {/* Subtask Input and List */}
          <div className="mt-4">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Add subtask"
              className="w-full p-2 border rounded"
            />
            <button onClick={handleAddSubtask} className="px-4 py-2 mt-2 text-white bg-green-500 rounded">Add Subtask</button>

            <div className="mt-2">
              {subtasks.map(subtask => (
                <div key={subtask.id} className={`flex items-center justify-between p-2 border rounded ${subtask.completed ? 'line-through bg-gray-200' : ''}`}>
                  <span>{subtask.title}</span>
                  <div>
                    <button onClick={() => handleCompleteSubtask(subtask.id)} className={`px-2 py-1 ${subtask.completed ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded`}>
                      {subtask.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => handleDeleteSubtask(subtask.id)} className="px-2 py-1 ml-2 text-white bg-red-500 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
