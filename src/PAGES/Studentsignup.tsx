import { useState, type FormEvent } from "react";

import "./student-signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Studentsignup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!studentId) {
      setErrorMsg("Student ID is required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      studentId,
      password,
    };

    try {
      const response = await axios.post(
        "https://fullstack-student-backend.onrender.com/api/auth",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMsg("Signup successful!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setStudentId("");
      setPassword("");
      setConfirmPassword("");

      localStorage.setItem("userId", response.data._id);
      navigate("/Secondarypage");
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-background">
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>Student Signup</h2>

        <div className="form-group">
          <label>First Name</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Student ID <span className="required">*</span></label>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
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

        <div className="form-group password">
          <label>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-toggle">
            {showConfirmPassword ? <EyeSlashIcon className="eye-icon" /> : <EyeIcon className="eye-icon" />}
          </span>
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
