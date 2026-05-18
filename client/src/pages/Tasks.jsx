import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const columns = [
  { key: "todo", title: "To Do" },
  { key: "in-progress", title: "In Progress" },
  { key: "completed", title: "Done" },
];

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => API.get("/tasks").then(({ data }) => setTasks(data));

  useEffect(() => {
    loadTasks();
  }, []);

  const groupedTasks = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.key] = tasks.filter((task) => task.status === column.key);
      return acc;
    }, {});
  }, [tasks]);

  const updateStatus = async (id, status) => {
    await API.patch(`/tasks/${id}/status`, { status });
    loadTasks();
  };

  return (
    <main className="page app-page">
      <div className="page-head">
        <h1>{user.role === "admin" ? "Tasks" : "My Tasks"}</h1>
        {user.role === "admin" && <Link className="button glow-button" to="/tasks/create">New Task</Link>}
      </div>
      <section className="kanban-board">
        {columns.map((column) => (
          <div className={`kanban-column ${column.key}`} key={column.key}>
            <div className="column-head">
              <h2>{column.title}</h2>
              <span>{groupedTasks[column.key]?.length || 0}</span>
            </div>
            <div className="column-list">
              {groupedTasks[column.key]?.map((task) => (
                <article className="task-card" key={task._id}>
                  <span className={`priority ${task.priority}`}>{task.priority}</span>
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description"}</p>
                  <div className="task-divider" />
                  <div className="task-meta">
                    <div><span>Project</span><strong>{task.project?.name || "General"}</strong></div>
                    <small>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</small>
                  </div>
                  <select value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)}>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Tasks;
