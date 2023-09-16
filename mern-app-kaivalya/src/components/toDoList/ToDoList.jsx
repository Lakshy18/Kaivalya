import React, { useEffect, useState, useReducer } from "react";
import Create from "./Create";
import axios from "axios";

const ToDoList = () => {
  const [toDoData, setToDoData] = useState([]);
  const [refreshkey, setrefreshKey] = useState(0);

  useEffect(() => {
    const asyncFunction = async () => {
      const data = await axios.get("http://localhost:3001/getToDodata");
      setToDoData(data.data);
      console.log(refreshkey);
      // setrefreshKey(refreshkey+1)
      return;
    };
    return () => {
      asyncFunction();
    };
  }, [refreshkey]);
  // window.location.reload(true)
  

  console.log(toDoData);
  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/updateToDodata/" + id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setrefreshKey(refreshkey + 1);
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
    setrefreshKey(refreshkey + 1);
  };

  return (
    <div className="listpage">
      <Create />
      <div className="todolistcontainer">
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
      </div>
    </div>
  );
};

export default ToDoList;
