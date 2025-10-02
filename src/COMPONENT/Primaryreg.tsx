import { useState, type FormEvent } from "react";
import { GraduationCap } from "lucide-react";
import "./Primaryreg.css";

export default function PrimaryRegistration() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [showAccountPopup, setShowAccountPopup] = useState(false);

  const [formData, setFormData] = useState({
    // Student Info
    studentEmail: "",
    fullName: "",
    dob: "",
    placeOfBirth: "",
    nationality: "Nigeria",
    stateOfOrigin: "",
    address: "",
    phone: "",
    classApplying: "Primary 1",
    gender: "Female",
    passportPhoto: null as File | null,

    // Parent Info
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentAddress: "",

    // Payment Proof
    paymentProof: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // Step 1: Register student (send only text fields)
  if (step === 1) {
    try {
      // Exclude file objects
      const { passportPhoto, paymentProof, ...studentInfo } = formData;







       const response = await fetch("https://backend-one-py48.onrender.com/api/PrimaryStudent", {
         method: "POST",
         body: JSON.stringify(studentInfo),
         headers: { "Content-Type": "application/json" },
       });

      const data = await response.json();
      if (data.success) {
        setStudentCode(data.studentCode);
        setStep(2);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("Step 1 error:", err);
      alert("Failed to create student. Try again.");
    } finally {
      setLoading(false);
    }
    return;
  }

  // Step 6: Finalize registration (send everything with FormData)
  if (step === 6) {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        const value = (formData as any)[key];
        if (value !== null && value !== "") {
          formDataToSend.append(key, value);
        }
      }
      formDataToSend.append("studentCode", studentCode);

      const response = await fetch("https://backend-one-py48.onrender.com/api/PrimaryStudent/finalize", {
      method: "POST",
      body: formDataToSend, // don't set Content-Type!
    });

      // const response = await fetch("https://backend-one-py48.onrender.com", {
      //   method: "POST",
      //   body: formDataToSend,
      // });

      const data = await response.json();

      if (response.ok && data.success) {
        setStep(7);
      } else {
        alert("Failed: " + (data.message || data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Step 6 error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
    return;
  }

  // Other steps: just move forward
  setStep(step + 1);
  setLoading(false);
};


  

  const handleDownloadSlip = () => {
    const slip = document.getElementById("printable-slip");
    if (!slip) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Primary Registration Slip</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          ${slip.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  
    const steps = [
  "Step 1\nStudent Information",
  "Step 2\nParent Information",
  "Step 3\nStudent ID",
  "Step 4\nPayment Fees",
  "Step 5\nPayment Upload",
  "Step 6\nConfirm Details",
];

  

  return (
    <div className="primary-school">
      {/* ✅ Navigation */}
            <header className="vc-header">
              <div className="vc-logo">
                <GraduationCap className="vc-icon" color="#fff" />
                <span style={{ color: "#fff" }}>Vincent C Academy</span>
              </div>
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
              <div
                className={`vc-hamburger ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="vc-line"></div>
                <div className="vc-line"></div>
                <div className="vc-line"></div>
              </div>
            </header>
      
      <div className="form-background">
        <header className="form-header">
          <h1>Vincent C Academy</h1>
          <p>Primary Admissions Portal</p>
        </header>

        {/* Progress Bar */}
        {step <= 6 && (
          <div className="progress-bar">
            {steps.map((label, index) => (
              <div
                key={index}
                className={`progress-step ${step === index + 1 ? "active" : ""}`}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Student Info */}
        {step === 1 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Student Information</h2>
            <div className="form-grid">
              <label>Email *<input type="email" name="studentEmail" onChange={handleChange} required /></label>
              <label>Full Name *<input type="text" name="fullName" onChange={handleChange} required /></label>
              <label>Date of Birth *<input type="date" name="dob" onChange={handleChange} required /></label>
              <label>Place of Birth<input type="text" name="placeOfBirth" onChange={handleChange} /></label>
              <label>Nationality<input type="text" name="nationality" defaultValue="Nigeria" onChange={handleChange} /></label>
              <label>State of Origin<input type="text" name="stateOfOrigin" onChange={handleChange} /></label>
              <label>Address<input type="text" name="address" onChange={handleChange} /></label>
              <label>Phone<input type="tel" name="phone" onChange={handleChange} /></label>
              <label>Class Applying<input type="text" name="classApplying" defaultValue="Primary 1" onChange={handleChange} /></label>
              <label> Gender <select name="gender" onChange={handleChange}><option>Female</option><option>Male</option></select></label>
              <label>Passport Photo<input type="file" name="passportPhoto" accept="image/*" onChange={handleChange} required /></label>
            </div>
            <div className="form-navigation">
              <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button>
            </div>
          </form>
        )}

        {/* Step 2: Parent Info */}
        {step === 2 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Parent Information</h2>
            <div className="form-grid">
              <label>Parent Full Name *<input type="text" name="parentName" onChange={handleChange} required /></label>
              <label>Parent Email *<input type="email" name="parentEmail" onChange={handleChange} required /></label>
              <label>Parent Phone *<input type="tel" name="parentPhone" onChange={handleChange} required /></label>
              <label>Parent Address<input type="text" name="parentAddress" onChange={handleChange} /></label>
            </div>
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(1)}>Back</button>
              <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button>
            </div>
          </form>
        )}

 {/* Step 3: Student ID */}
        {step === 3 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Student ID</h2>
            <p>Your unique student code is:</p>
            <div className="student-code-box">{studentCode}</div>
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(3)}>Back</button>
              <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button>
            </div>
          </form>
        )}
        {/* Step 4: Fees */}
        {step === 4 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Payment Fees</h2>
            <ul className="payment-list">
              <li>Tuition Fee: ₦80,000</li>
              <li>Books & Uniforms: ₦20,000</li>
              <li>PTA Fee: ₦5,000</li>
              <li>BUS Fee: ₦15,000</li>
            </ul>
            <p><b>Total:</b> ₦120,000</p>
            <button type="button" onClick={() => setShowAccountPopup(true)}>
              Get Account Number
            </button>
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(2)}>Back</button>
              <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button>
            </div>
          </form>
        )}

        {showAccountPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>Bank Details</h3>
              <p><b>Bank:</b> opay</p>
              <p><b>Account Number:</b> 8102974792</p>
              <p><b>Account Name:</b> Vincent C </p>
              <button onClick={() => setShowAccountPopup(false)}>Close</button>
            </div>
          </div>
        )}

        

        {/* Step 5: Payment Proof */}
        {step === 5 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Upload Payment Proof</h2>
            <input type="file" name="paymentProof" onChange={handleChange} required />
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(4)}>Back</button>
              <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button>
            </div>
          </form>
        )}

        {/* Step 6: Confirm Details */}
        {step === 6 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Confirm Your Details</h2>
            <table className="form-table">
              <tbody>
                <tr><td>Full Name</td><td>{formData.fullName}</td></tr>
                <tr><td>Email</td><td>{formData.studentEmail}</td></tr>
                <tr><td>Date of Birth</td><td>{formData.dob}</td></tr>
                <tr><td>Class Applying</td><td>{formData.classApplying}</td></tr>
                <tr><td>Nationality</td><td>{formData.nationality}</td></tr>
                <tr><td>State of Origin</td><td>{formData.stateOfOrigin}</td></tr>
                <tr><td>Parent Name</td><td>{formData.parentName}</td></tr>
                <tr><td>Parent Phone</td><td>{formData.parentPhone}</td></tr>
                <tr><td>Total Fees</td><td>₦120,000</td></tr>
              </tbody>
            </table>
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(5)}>Back</button>
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}

        {/* Step 7: Success */}
        {step === 7 && (
          <div className="form-step success-box">
            <h2>✅ Registration Completed!</h2>
            <p>Your Student Code is: <b>{studentCode}</b></p>
            <p>⚠️ Keep this safe for Parents Forum access.</p>

            <div className="printable-slip" id="printable-slip">
              <h2>Vincent C Academy</h2>
              <p><b>Primary Registration Slip</b></p>
              <hr />
              <table>
                <tbody>
                  <tr><td>Student Name</td><td>{formData.fullName}</td></tr>
                  <tr><td>Student Code</td><td><b>{studentCode}</b></td></tr>
                  <tr><td>Date of Birth</td><td>{formData.dob}</td></tr>
                  <tr><td>Class Applying</td><td>{formData.classApplying}</td></tr>
                  <tr><td>Parent Name</td><td>{formData.parentName}</td></tr>
                  <tr><td>Parent Phone</td><td>{formData.parentPhone}</td></tr>
                  <tr><td>Total Fees</td><td>₦120,000</td></tr>
                  <tr><td>Registration Date</td><td>{new Date().toLocaleDateString()}</td></tr>
                </tbody>
              </table>
            </div>

            <button type="button" onClick={handleDownloadSlip} className="download-btn">
              ⬇️ Download Registration Slip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
