import React from "react";

export default function AuthCard({
  mode,
  username,
  password,
  setUsername,
  setPassword,
  setMode,
  handleSubmit,
  message
}) {
  return (
    <div className="auth-card">
      <div className="auth-left">
        <div className="brand-block">
          <h1 className="brand-name">CakeTalk</h1>
          <p className="brand-description">
            Wedding cake planning, beautifully organized.
          </p>
        </div>

        <div className="cake-hero">
          <div className="cake-shadow"></div>
          <div className="cake-tier tier-bottom">
            <div className="cake-line"></div>
          </div>
          <div className="cake-tier tier-middle">
            <div className="cake-line"></div>
          </div>
          <div className="cake-tier tier-top">
            <div className="cake-line"></div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <h2 className="auth-title">
          {mode === "login" ? "Log In" : "Sign Up"}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username or email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button type="submit" className="primary-btn">
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <div className="switch-auth">
          {mode === "login" ? (
            <p>
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-btn"
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="text-btn"
                onClick={() => setMode("login")}
              >
                Log in
              </button>
            </p>
          )}
        </div>

        {message && <p className="error-text">{message}</p>}
      </div>
    </div>
  );
}