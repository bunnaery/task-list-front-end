import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
Submitting a NewTaskForm should
	add rendered Tasks to the App and
	trigger a POST request to Task List API to create a new task in the database.
*/

const NewTaskForm = ({ addTaskCallback }) => {
  const [formFields, setFormFields] = useState({
    title: ''
  });

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    addTaskCallback({
      title: formFields.title
    });

    setFormFields({
      title: ''
    });
  };

  return(
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          name='title'
          value={formFields.title}
          onChange={onTitleChange}
        />
      </div>
      <input
        type='submit'
        value='Add Task'
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  addTaskCallback: PropTypes.func.isRequired
};

export default NewTaskForm;