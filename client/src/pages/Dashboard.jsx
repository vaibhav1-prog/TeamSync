import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/dashboard/stats").then(({ data }) => setStats(data));
  }, []);

  if (!stats) return <main className="page app-page">Loading dashboard...</main>;

  return (
    <main className="page app-page">
      <div className="page-head"><h1>Dashboard Overview</h1></div>
      <section className="stats-grid dashboard-grid">
        <div className="stat"><span>Total Projects</span><strong>{stats.totalProjects}</strong></div>
        <div className="stat blue"><span>Total Tasks</span><strong>{stats.totalTasks}</strong></div>
        <div className="stat violet"><span>To Do</span><strong>{stats.todoTasks}</strong></div>
        <div className="stat amber"><span>In Progress</span><strong>{stats.inProgressTasks}</strong></div>
        <div className="stat green"><span>Completed</span><strong>{stats.completedTasks}</strong></div>
        <div className="stat danger"><span>Overdue</span><strong>{stats.overdueTasks}</strong></div>
      </section>
    </main>
  );
};

export default Dashboard;
