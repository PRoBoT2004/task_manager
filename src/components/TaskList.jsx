import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onEdit, onComplete, onDelete }) => {
  return (
    <div className = 'bg-slate-800'>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
