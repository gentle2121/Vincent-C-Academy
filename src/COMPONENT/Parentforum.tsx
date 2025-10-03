import React, { useState, useEffect, FormEvent } from "react";
import { GraduationCap, LogOut, MessageSquarePlus } from "lucide-react";
import "./Parentforum.css";

const API_URL = "https://backend-one-py48.onrender.com/api/forum";

export default function ParentsForum(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [parentName, setParentName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [replying, setReplying] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fetching, setFetching] = useState(false);

  // ✅ Login handler
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentCode, parentName }),
      });

      const data = await response.json();
      if (response.ok && data.success && data.token) {
        localStorage.setItem("forumToken", data.token);
        if (data.parent) setParentName(data.parent);
        setIsAuthenticated(true);
        fetchDiscussions();
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch discussions
  const fetchDiscussions = async () => {
    const token = localStorage.getItem("forumToken");
    if (!token) return;

    setFetching(true);
    try {
      const res = await fetch(`${API_URL}/discussions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDiscussions(Array.isArray(data.discussions) ? data.discussions : []);
        setIsAuthenticated(true);
        if (data.parent) setParentName(data.parent);
      } else {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("forumToken");
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError("Could not load discussions. Please try again.");
    } finally {
      setFetching(false);
    }
  };

  // ✅ Post new discussion
  const handlePostDiscussion = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setPosting(true);

    const token = localStorage.getItem("forumToken");
    try {
      const res = await fetch(`${API_URL}/discussions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTitle, body: newBody }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNewTitle("");
        setNewBody("");
        fetchDiscussions();
      } else {
        setError("Failed to post discussion.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setPosting(false);
    }
  };

  // ✅ Post reply
  const handlePostReply = async (discussionId: string) => {
    if (!replyInputs[discussionId]?.trim()) return;
    setReplying(discussionId);

    const token = localStorage.getItem("forumToken");
    try {
      const res = await fetch(`${API_URL}/discussions/${discussionId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: replyInputs[discussionId] }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReplyInputs((prev) => ({ ...prev, [discussionId]: "" }));
        fetchDiscussions();
      } else {
        setError("Failed to post reply.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setReplying(null);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  return (
    <div className="forum-page">
      {/* Navigation Header */}
      <header className="vc-header">
        <div className="vc-logo">
          <GraduationCap className="vc-icon" color="#fff" />
          <span style={{ color: "#fff" }}>Vincent C Academy</span>
        </div>

        {/* Nav Links */}
        <nav className={menuOpen ? "vc-nav open" : "vc-nav"}>
          <ul>
            <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="/Aboutus" onClick={() => setMenuOpen(false)}>About Us</a></li>
            <li><a href="/Admissions" onClick={() => setMenuOpen(false)}>Admissions</a></li>
            <li><a href="/Event" onClick={() => setMenuOpen(false)}>Event</a></li>
            <li><a href="/Contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            <li><a href="/Parentforum" onClick={() => setMenuOpen(false)}>Parents Forum</a></li>
          </ul>
        </nav>

        {/* Hamburger */}
        <div
          className={`vc-hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="vc-line"></div>
          <div className="vc-line"></div>
          <div className="vc-line"></div>
        </div>
      </header>

      {/* Forum Content */}
      {!isAuthenticated ? (
        <section className="login-section">
          <div className="login-card">
            <h2>🎓 Parents Forum</h2>
            <p>Enter your child’s code to access discussions.</p>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="Student Unique Code"
                required
              />
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Parent Name"
                required
              />
              {error && <p className="error-msg">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Checking..." : "Enter Forum"}
              </button>
            </form>
          </div>
        </section>
      ) : (
        <section className="forum-section">
          <div className="welcome-banner">
            <h2>👋 Welcome, {parentName}</h2>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("forumToken");
                setIsAuthenticated(false);
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* New Post */}
          <div className="new-post-card">
            <h3>
              <MessageSquarePlus size={18} /> Start a Discussion
            </h3>
            <form onSubmit={handlePostDiscussion}>
              <input
                type="text"
                placeholder="Discussion Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="What's on your mind?"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
              <button type="submit" disabled={posting}>
                {posting ? "Posting..." : "Post"}
              </button>
            </form>
          </div>

          {/* Discussions */}
          <div className="discussions">
            {fetching ? (
              <p>Loading discussions...</p>
            ) : discussions.length > 0 ? (
              discussions.map((d, idx) => (
                <div key={d._id || idx} className="discussion-card">
                  <h4>📌 {d.title}</h4>
                  <p>{d.body}</p>
                  <small>By {d.createdBy || "Parent"}</small>

                  <div className="replies">
                    {d.replies?.length > 0 ? (
                      d.replies.map((r: any, ridx: number) => (
                        <p key={r._id || ridx} className="reply">
                          💬 <b>{r.parentName}</b>: {r.reply}
                        </p>
                      ))
                    ) : (
                      <p className="no-replies">No replies yet.</p>
                    )}
                  </div>

                  <div className="reply-box">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyInputs[d._id] || ""}
                      onChange={(e) =>
                        setReplyInputs((prev) => ({
                          ...prev,
                          [d._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => handlePostReply(d._id)}
                      disabled={replying === d._id}
                    >
                      {replying === d._id ? "Replying..." : "Reply"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-discussions">No discussions yet.</p>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Vincent C Academy. All rights reserved.
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/2348102974792"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>
    </div>
  );
}
