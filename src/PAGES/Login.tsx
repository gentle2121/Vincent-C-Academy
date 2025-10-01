import { useState, type FormEvent } from "react";

import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    if (!studentId || !password) {
      setErrorMsg("Student ID and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "",
        { studentId, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("userId", response.data._id);
      navigate("/Secondarypage");
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Student Login</h2>

        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="form-group password">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-toggle">
            {showPassword ? <EyeSlashIcon className="eye-icon" /> : <EyeIcon className="eye-icon" />}
          </span>
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
