import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AddTaskPage from "./pages/AddTaskPage";
import useAuth from "./lib/authentication";
import LoginPage from "./pages/LoginPage";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [count, setCount] = useState(0);
  const { user, loading } = useAuth();

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
              <Route path="/add-task" element={<AddTaskPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
