import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "__m.u.n.e.n.e.z.z__" && password === "munezz456") {
      navigate("/Admin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="admin">
      <fieldset>
       <p>Please login to continue to the admin page : </p>
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        
      </fieldset>
    </div>
  );
}

export default Admin;
