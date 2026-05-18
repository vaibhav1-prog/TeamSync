import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then(({ data }) => setProjects(data));
  }, []);

  return (
    <main className="page app-page">
      <div className="page-head">
        <h1>Projects</h1>
        {user.role === "admin" && <Link className="button glow-button" to="/projects/create">New Project</Link>}
      </div>
      <section className={projects.length ? "project-grid" : "empty-panel"}>
        {projects.length === 0 && (
          <div>
            <h2>No projects found.</h2>
            <p>Create a new project to get started with your team.</p>
          </div>
        )}
        {projects.map((project) => (
          <article className="project-card" key={project._id}>
            <span className="card-eyebrow">Project</span>
            <h2>{project.name}</h2>
            <p>{project.description || "No description"}</p>
            <div className="card-meta">
              <span>{project.members?.length || 0} members</span>
              <span>{project.createdBy?.name || "Admin"}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Projects;
