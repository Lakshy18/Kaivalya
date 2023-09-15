import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [taskDetails, setTaskDetails] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/add", { taskDetails: taskDetails })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(taskDetails)
  };

  return (
    <div className="ToDoContainer">
      <div className="ToDoWrapper">
        <div className="ToDoHeading">To Do List</div>
        <div>Add New Item</div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              id="task"
              type="text"
              value={taskDetails}
              placeholder="Enter Task"
              onChange={(e) => setTaskDetails(e.target.value)}
              required
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
