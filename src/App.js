import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import axios from 'axios';
import './App.css';

// const URL = 'https://coolcud-task-list-api.onrender.com';
// const URL = 'https://task-list-api-c17.onrender.com/';

// Data
// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const mapTasks = (responseData) => {
  const taskData = responseData.data.map((task) => {
    return {
      id: task.id,
      title: task.title,
      isComplete: task.is_complete
    };
  });

  return taskData;
};

// App
const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getTasks = () => {
    axios
      .get(`${URL}/tasks`)
      .then((response) => {
        const newTasks = mapTasks(response);
        setTaskData(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

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

  const toggleCompleteTask = task => {
    let newURL = '';
    if (task.isComplete) {
      newURL = `${URL}/tasks/${task.id}/mark_complete`;
    } else {
      newURL = `${URL}/tasks/${task.id}/mark_incomplete`;
    }

    axios
      .patch(newURL)
      .then(() => {
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = id => {
    setTaskData(oldTasks => {
      return oldTasks.filter(task => task.id != id);
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
      </main>
    </div>
  );
};

export default App;
