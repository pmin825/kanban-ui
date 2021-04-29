import React from 'react';
import { Link } from 'react-router-dom';

const TaskIndexItem = ({ task, removeTask, taskUpdate }) => {
  return (
    <div className="task-item-container">
      <p>
        <b>Task:</b> {task.title}
      </p>
      <p>
        <b>Desc:</b> {task.description}
      </p>
      <Link to={`/${task._id}`}>
        <button>EDIT/ASSIGN</button>
      </Link>
      <button onClick={removeTask} value={task.title}>
        REMOVE
      </button>
    </div>
  );
};

export default TaskIndexItem;
