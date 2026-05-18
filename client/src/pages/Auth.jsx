import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FolderKanban, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BlockchainBg from "../components/BlockchainBg";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const initialMode = location.pathname.includes("signup") ? "signup" : "login";
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState("member");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    navigate(nextMode === "signup" ? "/signup" : "/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignup) {
        await signup({ ...form, role });
      } else {
        await login(form.email, form.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="auth-shell">
      {/* Live animated blockchain canvas replaces static PNG */}
      <BlockchainBg />
      <div className="mesh-overlay" />
      <header className="auth-topbar">
        <Link to="/auth" className="auth-brand"><FolderKanban size={24} /> TeamSync</Link>
        <div className="auth-actions">
          <button className={mode === "login" ? "top-link active" : "top-link"} onClick={() => switchMode("login")}>Login</button>
          <button className={mode === "signup" ? "pill-link active" : "pill-link"} onClick={() => switchMode("signup")}>Signup</button>
        </div>
      </header>

      <section className="auth-hero">
        <div className="hero-copy">
          <div className="hero-kicker"><Sparkles size={18} /> Team command center</div>
          <h1>Plan the work. Assign the owner. Ship on time.</h1>
          <p>TeamSync keeps every project, task, deadline, and teammate in one sharp workspace built for daily execution.</p>
          <div className="hero-badges">
            <span><ShieldCheck size={17} /> Role access</span>
            <span><TimerReset size={17} /> Deadline focus</span>
            <span><FolderKanban size={17} /> Project clarity</span>
          </div>
          <div className="hero-points">
            <div><strong>Organized</strong><span>Projects, members, and tasks connected</span></div>
            <div><strong>Accountable</strong><span>Admin and member workflows separated</span></div>
            <div><strong>Visible</strong><span>Status, priority, and overdue work at a glance</span></div>
          </div>
        </div>

        <form className="auth-panel" onSubmit={handleSubmit}>
          <div className="role-switch">
            <button type="button" className={role === "member" ? "selected" : ""} onClick={() => setRole("member")}>User</button>
            <button type="button" className={role === "admin" ? "selected" : ""} onClick={() => setRole("admin")}>Admin</button>
          </div>

          <div className="auth-title">
            <h2>{isSignup ? "Create account" : "Sign in"}</h2>
            <p>{isSignup ? "Start managing your team today" : "Enter your credentials to continue"}</p>
          </div>

          {error && <p className="error">{error}</p>}

          {isSignup && (
            <label>
              <span>Name</span>
              <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
          )}

          <label>
            <span>Email</span>
            <input placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>

          <label>
            <span>Password</span>
            <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>

          <button className="dark-submit" type="submit">{isSignup ? "Sign up" : "Sign in"} -&gt;</button>

          <p className="auth-bottom">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button type="button" onClick={() => switchMode(isSignup ? "login" : "signup")}>
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Auth;
