import React, { useState, useEffect } from 'react';
import TaskIndexItem from './TaskIndexItem';

const TaskIndex = ({
  tasks,
  users,
  newTask,
  handleTaskInput,
  addTask,
  removeTask,
  taskUpdate,
  todoList,
  inProgressList,
  inReviewList,
  completeList,
}) => {
  return (
    <>
      <div className="todo-index-container">
        <h2>Todo:</h2>
        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            value={newTask.title}
            name="title"
            placeholder="task title..."
            onChange={handleTaskInput}
          ></input>
          <input
            type="text"
            value={newTask.description}
            name="description"
            placeholder="description..."
            onChange={handleTaskInput}
          ></input>
          <button>Add new Task</button>
        </form>
        {todoList &&
          todoList.map((task) => {
            return (
              <TaskIndexItem
                key={task._id}
                task={task}
                removeTask={removeTask}
                taskUpdate={taskUpdate}
              />
            );
          })}
      </div>
      <div className="inprogress-index-container">
        <h2>In Progress:</h2>
        {inProgressList &&
          inProgressList.map((task) => {
            return (
              <TaskIndexItem
                key={task._id}
                task={task}
                removeTask={removeTask}
                taskUpdate={taskUpdate}
              />
            );
          })}
      </div>
      <div className="inreview-index-container">
        <h2>In Review:</h2>
        {inReviewList &&
          inReviewList.map((task) => {
            return (
              <TaskIndexItem
                key={task._id}
                task={task}
                removeTask={removeTask}
                taskUpdate={taskUpdate}
              />
            );
          })}
      </div>
      <div className="complete-index-container">
        <h2>Complete:</h2>
        {completeList &&
          completeList.map((task) => {
            return (
              <TaskIndexItem
                key={task._id}
                task={task}
                removeTask={removeTask}
                taskUpdate={taskUpdate}
              />
            );
          })}
      </div>
    </>
  );
};

export default TaskIndex;
