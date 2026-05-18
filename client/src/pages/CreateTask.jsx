import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CreateTask = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });

  useEffect(() => {
    API.get("/users").then(({ data }) => setUsers(data));
    API.get("/projects").then(({ data }) => setProjects(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    navigate("/tasks");
  };

  return (
    <main className="page narrow">
      <form className="panel form" onSubmit={handleSubmit}>
        <h1>Create Task</h1>
        <input placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>
          <option value="">Select project</option>
          {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
        </select>
        <select value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
          <option value="">Assign to</option>
          {users.map((member) => <option key={member._id} value={member._id}>{member.name} ({member.role})</option>)}
        </select>
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
        <button type="submit">Create Task</button>
      </form>
    </main>
  );
};

export default CreateTask;
