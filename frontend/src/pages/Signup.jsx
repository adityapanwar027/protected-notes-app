import { useState } from "react";
import axios from "axios";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "linear-gradient(135deg, #f7f3e8 0%, #e8f1f2 100%)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    padding: "34px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.14)",
  },
  heading: {
    margin: "0 0 24px",
    color: "#102a43",
    fontSize: "32px",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "16px",
    outlineColor: "#2f80ed",
  },
  button: {
    width: "100%",
    padding: "13px 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2f80ed",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
      <h1 style={styles.heading}>Signup Page</h1>

      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          style={styles.input}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          style={styles.input}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          style={styles.input}
        />

        <br />
        <br />

        <button type="submit" style={styles.button}>Signup</button>
      </form>
      </div>
    </div>
  );
}

export default Signup;
