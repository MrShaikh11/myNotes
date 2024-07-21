import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from "./components/HomePage";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <HomePage />
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Dashboard;
