import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const CreateProject = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", members: [] });

  useEffect(() => {
    API.get("/users").then(({ data }) => setUsers(data));
  }, []);

  const toggleMember = (id) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.includes(id) ? prev.members.filter((member) => member !== id) : [...prev.members, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/projects", form);
    navigate("/projects");
  };

  return (
    <main className="page app-page narrow">
      <form className="panel form" onSubmit={handleSubmit}>
        <h1>Create Project</h1>
        <input placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="check-list">
          {users.map((member) => (
            <label key={member._id}>
              <input type="checkbox" checked={form.members.includes(member._id)} onChange={() => toggleMember(member._id)} />
              {member.name} ({member.role})
            </label>
          ))}
        </div>
        <button type="submit">Create Project</button>
      </form>
    </main>
  );
};

export default CreateProject;
