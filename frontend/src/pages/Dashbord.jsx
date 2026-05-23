import { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px 20px",
    background: "linear-gradient(135deg, #f7f3e8 0%, #e8f1f2 100%)",
    color: "#1f2933",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "920px",
    margin: "0 auto",
  },

  heading: {
    marginBottom: "24px",
    fontSize: "36px",
    color: "#102a43",
  },

  form: {
    marginBottom: "36px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.12)",
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

  textarea: {
    width: "100%",
    minHeight: "130px",
    boxSizing: "border-box",
    padding: "13px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "16px",
    resize: "vertical",
    outlineColor: "#2f80ed",
    fontFamily: "Arial, sans-serif",
  },

  primaryButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2f80ed",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },

  sectionTitle: {
    marginBottom: "18px",
    color: "#243b53",
  },

  noteCard: {
    marginBottom: "18px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
  },

  noteTitle: {
    margin: "0 0 8px",
    color: "#102a43",
  },

  noteContent: {
    margin: "0 0 16px",
    lineHeight: "1.6",
    color: "#52606d",
  },

  deleteButton: {
    padding: "9px 14px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#e12d39",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },

  divider: {
    display: "none",
  },
};

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const token = localStorage.getItem("token");

  // GET NOTES
  const getNotes = async () => {
    const res = await axios.get(
      "http://16.171.3.48:5000/api/notes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes(res.data);
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE NOTE
  const createNote = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://16.171.3.48:5000/api/notes",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Note created");

    setFormData({
      title: "",
      content: "",
    });

    getNotes();
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    await axios.delete(
      `http://16.171.3.48:5000/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Note deleted");

    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Dashboard Page</h1>

        <form onSubmit={createNote} style={styles.form}>
          <input
            name="title"
            placeholder="Note title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />

          <br />
          <br />

          <textarea
            name="content"
            placeholder="Note content"
            value={formData.content}
            onChange={handleChange}
            style={styles.textarea}
          />

          <br />
          <br />

          <button type="submit" style={styles.primaryButton}>
            Create Note
          </button>
        </form>

        <h2 style={styles.sectionTitle}>My Notes</h2>

        {notes.map((note) => (
          <div key={note._id} style={styles.noteCard}>
            <h3 style={styles.noteTitle}>{note.title}</h3>

            <p style={styles.noteContent}>{note.content}</p>

            <button
              onClick={() => deleteNote(note._id)}
              style={styles.deleteButton}
            >
              Delete
            </button>

            <hr style={styles.divider} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

