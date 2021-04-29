import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import UserIndex from '../components/UserIndex';
import TaskIndex from '../components/TaskIndex';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './mainpage.css';

const MainPage = ({ match }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '' });
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [completeList, setCompleteList] = useState([]);
  const [inReviewList, setInReviewList] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/v1/users');
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    let todo = [];
    let inProgress = [];
    let complete = [];
    let inReview = [];
    try {
      const response = await axios.get('http://localhost:9000/v1/tasks');
      setTasks(response.data.tasks);
      const allTasks = response.data.tasks;
      for (const task of allTasks) {
        if (task.type === 'TO DO') todo.push(task);
        if (task.type === 'IN PROGRESS') inProgress.push(task);
        if (task.type === 'COMPLETE') complete.push(task);
        if (task.type === 'IN REVIEW') inReview.push(task);
      }
      setTodoList(todo);
      setInProgressList(inProgress);
      setInReviewList(inReview);
      setCompleteList(complete);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    try {
      const response = await axios.post('http://localhost:9000/v1/users', user);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }

    setNewUser({
      firstName: '',
      lastName: '',
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    const task = {
      assignee: newTask.assignee,
      title: newTask.title,
      description: newTask.description,
    };

    try {
      const response = await axios.post('http://localhost:9000/v1/tasks', task);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }

    setNewTask({
      type: '',
      assignee: '',
      title: '',
      description: '',
    });
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleTaskInput = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const removeTask = async (e) => {
    e.preventDefault();
    const taskTitle = { title: e.target.value };
    try {
      const response = await axios.delete('http://localhost:9000/v1/tasks', {
        data: taskTitle,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const taskUpdate = async (e) => {
    e.preventDefault();
    const taskTitle = e.target.value;
    debugger;
    try {
      const response = await axios.put('http://localhost:9000/v1/tasks', {
        data: taskTitle,
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="main-page-content-container">
          <UserIndex
            users={users}
            newUser={newUser}
            handleUserInput={handleUserInput}
            addUser={addUser}
          />
          <TaskIndex
            tasks={tasks}
            users={users}
            newTask={newTask}
            addTask={addTask}
            handleTaskInput={handleTaskInput}
            removeTask={removeTask}
            taskUpdate={taskUpdate}
            todoList={todoList}
            inProgressList={inProgressList}
            inReviewList={inReviewList}
            completeList={completeList}
          />
        </div>
      </div>
    </>
  );
};

export default withRouter(MainPage);
