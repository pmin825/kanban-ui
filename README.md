# kanban-ui

kanban-ui is a web application that allows users to manage tasks in a simple, intuitive way.  

## Backend Setup - Run the server locally
1) clone the repo
2) cd into kanban-api
3) run npm install
4) start up mongodb, you can do so by running <mongod --dbpath ~/data/db?
5) once mongod is running, run mongo 
6) use yarn start to start the program
7) if for whatever reason yarn start is not working, try yarn startdev

## Frontend Setup
1) from root of project, cd into frontend
2) run yarn install 
3) run yarn start

## Technologies 
* React
* Javascript 
* Node.js
* Express.js
* MongoDB
* Axios

## Implementation 

All users and tasks are stored in a local database with MongoDB, and our frontend interacts with the backend by making HTTP requests via axios. 

Code Snippet: Once data is fetched, we then filter through each task by their status type, and push them into the correct buckets. Once we have our buckets, we use React Hooks to set the state. 
```js
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
  
```
## Features 
* Ability to create new users
* Ability to add, remove, delete, edit, and assign tasks
* Add a title and description to the task
* Change task status type to either "TO DO, IN PROGRESS, IN REVIEW, or COMPLETE"
* Buckets of different tasks based on status type

Code Snippet: We edit a selected task by modifying it's current state to whatever the user inputs. We then send that edited task to store in our database via an axios. We then push the user back to the main page to see the all tasks. 
```js
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
```

## Future Direction
* Implement drag and drop feature of tasks between columns.
