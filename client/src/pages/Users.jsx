import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const roleColor = (role) => {
  if (role === "admin") return "badge-admin";
  return "badge-member";
};

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users")
      .then(({ data }) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <main className="page app-page">Loading users…</main>;

  return (
    <main className="page app-page">
      <div className="page-head">
        <h1>User Management</h1>
        <span className="users-count-badge">{users.length} total</span>
      </div>

      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className={u._id === user._id ? "users-row current-user" : "users-row"}>
                <td>
                  <div className="users-name-cell">
                    <div className="user-avatar" data-letter={u.name?.charAt(0).toUpperCase()}>
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="user-name-text">
                      {u.name}
                      {u._id === user._id && <em className="you-tag">you</em>}
                    </span>
                  </div>
                </td>
                <td className="user-email">{u.email}</td>
                <td>
                  <span className={`user-role-badge ${roleColor(u.role)}`}>
                    {u.role?.toUpperCase()}
                  </span>
                </td>
                <td className="user-joined">
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;
