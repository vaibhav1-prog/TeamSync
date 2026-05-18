import { Link, NavLink, useNavigate } from "react-router-dom";
import { FolderKanban, LayoutDashboard, ListTodo, LogOut, PanelsTopLeft, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="nav app-sidebar">
      <Link to="/dashboard" className="brand"><FolderKanban size={25} /> TeamSync</Link>
      {user && (
        <>
          <nav className="nav-links">
            <NavLink to="/dashboard"><LayoutDashboard size={18} /> Dashboard</NavLink>
            <NavLink to="/projects"><PanelsTopLeft size={18} /> Projects</NavLink>
            <NavLink to="/my-tasks"><ListTodo size={18} /> My Tasks</NavLink>
            {user.role === "admin" && (
              <NavLink to="/users"><Users size={18} /> Users</NavLink>
            )}
          </nav>
          <div className="nav-user">
            <div>
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={18} /> Log Out
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Navbar;

