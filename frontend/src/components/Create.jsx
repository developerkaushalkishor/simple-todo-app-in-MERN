import React, { useState } from "react";
import axios from "axios";

const Create = ({ onAddTask }) => {
  const [task, setTask] = useState();
  const handleAdd = async () => {
    if (task) {
      await axios
        .post("http://localhost:4000/add", { task: task })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));

      setTask(""); // clearing the input value
      onAddTask();
    } else {
      alert("Please enter a task");
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          type="text"
          name="task"
          id="task"
          value={task}
          placeholder="Your task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button style={{ marginLeft: "10px" }} type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default Create;
