import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import BlockchainBg from "./components/BlockchainBg";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import MyTasks from "./pages/MyTasks";
import Users from "./pages/Users";
import "./App.css";

const App = () => {
  const location = useLocation();
  const isAuthPage = ["/auth", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {/* Global animated blockchain background for all logged-in pages */}
      {!isAuthPage && (
        <div id="blockchain-root">
          <BlockchainBg />
          <div className="mesh-overlay" />
        </div>
      )}
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/projects/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/tasks/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
        <Route path="/my-tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;
