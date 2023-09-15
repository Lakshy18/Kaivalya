import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

const ToDoList = () => {
  const [toDoData, setToDoData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getToDodata")
      .then((res) => {
        setToDoData(res.data); //res.data
        console.log(toDoData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/updateToDodata/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteToDodata/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Create />
      {toDoData.map((todo, index) => (
        <div className="ToDoItem" key={`hello${index}`}>
          <div className="toDoNum">{index + 1}</div>
          <div className="toDoDesc">{todo.taskDetails}</div>
          <div className="toDoButton">
            {todo.done ? (
              <button
                style={{ backgroundColor: "green" }}
                className="toDoButton edit"
                onClick={() => handleEdit(todo._id)}
              >
                Completed
              </button>
            ) : (
              <button
                className="toDoButton edit"
                onClick={() => handleEdit(todo._id)}
              >
                Mark As Complete
              </button>
            )}
            <button
              className="toDoButton delete"
              onClick={() => handleDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ToDoList;
