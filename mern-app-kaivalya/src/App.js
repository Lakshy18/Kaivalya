import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./HomePage";
import ToDoList from "./components/toDoList/ToDoList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/toDoList" element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
