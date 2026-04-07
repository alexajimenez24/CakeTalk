import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setMessage("Please enter both username/email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("caketalk_users")) || {};

    if (mode === "signup") {
      if (users[trimmedUsername]) {
        setMessage("User already exists. Please log in.");
        return;
      }

      users[trimmedUsername] = {
        username: trimmedUsername,
        password: trimmedPassword
      };

      localStorage.setItem("caketalk_users", JSON.stringify(users));
      localStorage.setItem("caketalk_current_user", trimmedUsername);
      navigate("/home");
      return;
    }

    if (mode === "login") {
      const existingUser = users[trimmedUsername];

      if (!existingUser || existingUser.password !== trimmedPassword) {
        setMessage("Invalid username/email or password.");
        return;
      }

      localStorage.setItem("caketalk_current_user", trimmedUsername);
      navigate("/home");
    }
  };

  return (
    <div className="auth-page">
      <div className="background-blur bg-one"></div>
      <div className="background-blur bg-two"></div>
      <div className="background-blur bg-three"></div>

      <AuthCard
        mode={mode}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setMode={setMode}
        handleSubmit={handleSubmit}
        message={message}
      />
    </div>
  );
}