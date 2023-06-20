import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import axios from 'axios';
import './App.css';

const URL = 'https://coolcud-task-list-api.onrender.com/tasks';
// const URL = 'https://task-list-api-c17.onrender.com/tasks';


// App
const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getTasks = () => {
    axios
      .get(`${URL}`)
      .then((response) => {
        const newTasks = response.data.map((task) => {
          return {
            id: task.id,
            title: task.title,
            isComplete: task.is_complete
          };
        });
        setTaskData(newTasks);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const toggleCompleteTask = task => {
    let newURL = '';
    if (task.isComplete) {
      newURL = `${URL}/${task.id}/mark_complete`;
    } else {
      newURL = `${URL}/${task.id}/mark_incomplete`;
    }

    axios
      .patch(newURL)
      .then(() => {
        getTasks();
      });
  };

  const deleteTask = id => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        getTasks();
      });
  };

  const addTaskData = newTask => {
    const params = {
      title: newTask.title,
      description: 'description'
    };
    axios
      .post(`${URL}`, params)
      .then(() => {
        getTasks();
      });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList
            tasks={taskData}
            onUpdateTask={toggleCompleteTask}
            onDeleteTask={deleteTask}
          />}
        </div>
        <div>
          <NewTaskForm
            addTaskCallback={addTaskData}
          />
        </div>
      </main>
    </div>
  );
};

export default App;


  // BEFORE CONNECTING TO BACKEND:

  // UPDATE TASK FUNCTION:
  // const updateTask = updatedTask => {
  //   const tasks = taskData.map(task => {
  //     if (task.id === updatedTask.id) {
  //       return updatedTask;
  //     } else {
  //       return task;
  //     }
  //   });

  //   setTaskData(tasks);
  // };

  // DELETE TASK FUNCTION:
  // const deleteTask = id => {
  //   setTaskData(oldTasks => {
  //     return oldTasks.filter(task => task.id != id);
  //   });
  // };

  // FORM SUBMIT FUNCTION:
  // const addTaskData = newTask => {
  //   const newTaskList = [...taskData];

  //   const nextId = Math.max(...newTaskList.map(task => task.id)) + 1;

  //   newTaskList.push({
  //     id: nextId,
  //     title: newTask.title,
  //     isComplete: false
  //   });
  //   setTaskData(newTaskList);
  // };