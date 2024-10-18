import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  // State to store the list of todo tasks
  const [todos, setTodos] = useState([]);
  // This state is used to store the task that is currently being edited.
  const [updateTodo, setUpdateTodo] = useState(null);
  // State to store the updated text for the task being edited
  const [updatedTask, setUpdatedTask] = useState("");

  // Function to fetch tasks from the backend server
  const fatchTasks = async () => {
    const response = await axios.get("http://localhost:4000/tasks");
    setTodos(response.data); // Update state with the fetched tasks
  };

  // useEffect to fetch tasks when the component mounts
  useEffect(() => {
    fatchTasks();
  }, []);

  // Function to handle clicking the 'Edit' button for a specific task
  const handleEditClick = (task) => {
    setUpdateTodo(task); // Set the task to be updated
    setUpdatedTask(task.task); // Set the current task text to the input field
  };

  // Function to handle updating a task
  const handleUpdate = async () => {
    if (updateTodo && updatedTask) {
      // Send a PUT request to update the task in the backend
      await axios.put(`http://localhost:4000/tasks/${updateTodo._id}`, {
        task: updatedTask,
      });
      setUpdateTodo(null); // Clear the update state
      setUpdatedTask(""); // Clear the input field
      fatchTasks(); // Fetch the updated list of tasks
    }
  };

  // Function to handle deleting a task
  const handleDelete = async (id) => {
    // Send a DELETE request to remove the task from the backend
    await axios.delete(`http://localhost:4000/tasks/${id}`);
    fatchTasks(); // Fetch the updated list of tasks
  };

  return (
    <div>
      <h2>Todo app</h2>
      {/* Component to create a new task */}
      <Create onAddTask={fatchTasks} />
      {updateTodo ? (
        <div>
          {/* Input field for editing the task */}
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)} // Update the edited task text
          />
          <button onClick={handleUpdate}>Update Task</button>
          <button onClick={() => setUpdateTodo(null)}>Cancel</button>
        </div>
      ) : todos.length === 0 ? (
        // Display a message if there are no tasks
        <p>No Task</p>
      ) : (
        // Map through the list of tasks and display each one
        todos.map((task) => (
          <div
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              margin: "5px",
            }}
          >
            <p style={{ margin: "0", padding: "0" }}>{task.task}</p>
            {/* Button to edit the task */}
            <button onClick={() => handleEditClick(task)}>Edit</button>
            {/* Button to delete the task */}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
