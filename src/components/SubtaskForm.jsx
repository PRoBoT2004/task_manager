// SubtaskForm.jsx
import React, { useState } from 'react';

const SubtaskForm = ({ addSubtask }) => {
  const [subtask, setSubtask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubtask(subtask);
    setSubtask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={subtask}
        onChange={(e) => setSubtask(e.target.value)}
        placeholder="Subtask Title"
        required
      />
      <button type="submit">Add Subtask</button>
    </form>
  );
};

export default SubtaskForm;
