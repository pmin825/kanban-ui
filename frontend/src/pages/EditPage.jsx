import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

import './editpage.css';

const EditPage = ({ match, history }) => {
  const [currentTask, setCurrentTask] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchTask();
    fetchUsers();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get('http://localhost:9000/v1/tasks');
      const selected = response.data.tasks.filter(
        (task) => task._id === match.params.taskId
      );
      setCurrentTask(selected[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/v1/users');
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (e) => {
    e.preventDefault();
    const task = {
      type: currentTask.type,
      assignee: currentTask.assignee,
      title: currentTask.title,
      description: currentTask.description,
    };

    try {
      const response = await axios.put('http://localhost:9000/v1/tasks', task);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    debugger;
    setCurrentTask((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  if (!currentTask) return null;
  const assigneeList = users.map((user) => {
    const firstName = user.firstName.replace(/^"|"$/g, '');
    const lastName = user.lastName.replace(/^"|"$/g, '');

    return <option>{firstName + ' ' + lastName}</option>;
  });
  return (
    <>
      <Navbar />
      <div className="edit-form-container">
        <form onSubmit={editTask}>
          <label>
            Task Title:
            <input
              type="text"
              name="title"
              value={currentTask.title}
              onChange={handleEditInput}
            ></input>
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={currentTask.description}
              onChange={handleEditInput}
            ></input>
          </label>
          <label>
            Status Type:
            <select
              name="type"
              value={currentTask.type}
              onChange={handleEditInput}
            >
              <option value="TO DO">TO DO</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="COMPLETE">Complete</option>
              <option value="IN REVIEW">In Review</option>
            </select>
          </label>
          <label>
            Assign To:
            <select
              name="assignee"
              value={currentTask.assignee}
              onChange={handleEditInput}
            >
              {assigneeList}
            </select>
          </label>
          <button>Submit Edits</button>
        </form>
      </div>
    </>
  );
};

export default withRouter(EditPage);
