import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onUpdateTask, onDeleteTask }) => {
  const onTaskClick = () => {
    const updatedTask = {
      id: id,
      title: title,
      isComplete: !isComplete
    };
    onUpdateTask(updatedTask);
  };

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onTaskClick}
      >
        {title}
      </button>
      <button
      data-testid={`delete button ${id}`}
      className="tasks__item__remove button"
      onClick={() => onDeleteTask(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default Task;
