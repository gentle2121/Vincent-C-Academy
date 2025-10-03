import { useState, type FormEvent } from "react";
import { GraduationCap } from "lucide-react";
import "./Registration.css";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Popup for Bank Details
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Student Info
    studentEmail: "",
    surname: "",
    firstName: "",
    middleName: "",
    presentSchool: "",
    dob: "",
    placeOfBirth: "",
    nationality: "Nigeria",
    stateOfOrigin: "Abia",
    address: "",
    area: "",
    phone: "",
    currentClass: "",
    religion: "Christianity",
    denomination: "Catholics",
    schoolInterest: "SECONDARY SCHOOL",
    classInterest: "JS1",
    department: "",
    gender: "Female",
    homePhone: "",
    source: "Church advert",
    birthCert: null as File | null,
    transcript: null as File | null,
    passportPhoto: null as File | null,

    // Step 2: Parent Info
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentAddress: "",

    // Step 5: Payment
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

    // ✅ Step 1: Register student
    if (step === 1) {
      try {


        const response = await fetch("https://backend-one-py48.onrender.com/api/Student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
        // const response = await fetch("https://backend-one-py48.onrender.com", {
        //   method: "POST",
        //   body: JSON.stringify(formData),
        //   headers: { "Content-Type": "application/json" },
        // });

        const data = await response.json();
        if (data.success) {
          setStudentCode(data.studentCode);
          setStep(2);
        } else {
          alert("Error: " + data.error);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to create student. Try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ✅ Step 6: Final Submit
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


const response = await fetch("https://backend-one-py48.onrender.com/api/Student/finalize", {
      method: "POST",
      body: formDataToSend, // don't set Content-Type!
    });



    const data = await response.json();

    if (response.ok && data.success) {
      setStep(7);
    } else {
      alert("Failed: " + (data.message || data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
  return;
}



    setStep(step + 1);
    setLoading(false);
  };

  // ✅ Download Slip
  const handleDownloadSlip = () => {
    const slip = document.getElementById("printable-slip");
    if (!slip) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Secondary Registration Slip</title>
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
    "Step 2\nParents' Information",
    "Step 4\nStudent ID",
    "Step 3\nPayment Fees",
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

      {/* ✅ Form Section */}
      <div className="form-background">
        <header className="form-header">
          <h1>Vincent C Academy</h1>
          <p>Secondary Admissions Portal</p>
        </header>

        {/* ✅ Progress Bar */}
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

        


{/* ✅ Step 1: Student Info */} 
{step === 1 && ( <form className="form-step" onSubmit={handleSubmit}> <h2>Student Information</h2> <div className="form-grid"> <label> Student Email * <input type="email" name="studentEmail" onChange={handleChange} required /> </label> <label> Passport Photo * <input type="file" name="passportPhoto" accept="image/*" onChange={handleChange} required /> </label> <label>Surname *<input type="text" name="surname" onChange={handleChange} required /></label> <label>First Name *<input type="text" name="firstName" onChange={handleChange} required /></label> <label>Middle Name *<input type="text" name="middleName" onChange={handleChange} required /></label> <label>Present School *<input type="text" name="presentSchool" onChange={handleChange} required /></label> <label>Date of Birth *<input type="date" name="dob" onChange={handleChange} required /></label> <label>Place of Birth *<input type="text" name="placeOfBirth" onChange={handleChange} required /></label> <label>Nationality *<input type="text" name="nationality" defaultValue="Nigeria" onChange={handleChange} /></label> <label>State of Origin *<input type="text" name="stateOfOrigin" defaultValue="Abia" onChange={handleChange} /></label> <label>Address *<input type="text" name="address" onChange={handleChange} required /></label> <label>Area *<input type="text" name="area" onChange={handleChange} required /></label> <label>Phone *<input type="tel" name="phone" onChange={handleChange} required /></label> <label>Home Phone<input type="tel" name="homePhone" onChange={handleChange} /></label> <label>Current Class<input type="text" name="currentClass" onChange={handleChange} /></label> <label>Religion<input type="text" name="religion" defaultValue="Christianity" onChange={handleChange} /></label> <label>Denomination<input type="text" name="denomination" defaultValue="Catholics" onChange={handleChange} /></label> <label>School Interest<input type="text" name="schoolInterest" defaultValue="SECONDARY SCHOOL" onChange={handleChange} /></label> <label>Class Interest<input type="text" name="classInterest" defaultValue="JS1" onChange={handleChange} /></label> <label>Department<input type="text" name="department" onChange={handleChange} /></label> <label> Gender <select name="gender" onChange={handleChange}> <option>Female</option> <option>Male</option> </select> </label> <label>Source<input type="text" name="source" defaultValue="Church advert" onChange={handleChange} /></label> <label>Birth Certificate<input type="file" name="birthCert" accept="image/*,.pdf" onChange={handleChange} /></label> <label>Transcript<input type="file" name="transcript" accept="image/*,.pdf" onChange={handleChange} /></label> </div> <div className="form-navigation"> <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button> </div> </form> )}



{/* ✅ Step 2: Parent Info */} 
{step === 2 && ( <form className="form-step" onSubmit={handleSubmit}> <h2>Parents' Information</h2> <div className="form-grid"> <label>Parent Full Name *<input type="text" name="parentName" onChange={handleChange} required /></label> <label>Parent Email *<input type="email" name="parentEmail" onChange={handleChange} required /></label> <label>Parent Phone *<input type="tel" name="parentPhone" onChange={handleChange} required /></label> <label>Parent Address *<input type="text" name="parentAddress" onChange={handleChange} required /></label> </div> <div className="form-navigation"> <button type="button" onClick={() => setStep(1)}>Back</button> <button type="submit" disabled={loading}>{loading ? "Saving..." : "Next"}</button> </div> </form> )}


{/* ✅ Step 3: Student ID */}
        {step === 3 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Student ID</h2>
            <p>Your unique student code is:</p>
            <div className="student-code-box">{studentCode}</div>
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(3)}>Back</button>
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Next"}
              </button>
            </div>
          </form>
        )}






        {/* ✅ Step 4: Payment Fees */}
        {step === 4 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Payment Fees</h2>
            <ul className="payment-list">
              <li>Tuition Fee: ₦150,000</li>
              <li>PTA Meeting Fee: ₦5,000</li>
              <li>Sports & Laboratory Fee: ₦20,000</li>
              <li>Library & ICT Fee: ₦10,000</li>
              <li>Uniforms & ID Card: ₦15,000</li>
              <li>School Bus Fee: ₦30,000</li>
            </ul>
            <p><b>Total:</b> ₦230,000</p>
            <button type="button" onClick={() => setShowAccountPopup(true)}>
              Get Account Number
            </button>
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(2)}>Back</button>
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Next"}
              </button>
            </div>
          </form>
        )}

        {/* ✅ Popup for Bank Details */}
        {showAccountPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>Bank Details</h3>
              <p><b>Bank:</b> OPAY</p>
              <p><b>Account Number:</b> 8102974792</p>
              <p><b>Account Name:</b> Vincent C </p>
              <button onClick={() => setShowAccountPopup(false)}>Close</button>
            </div>
          </div>
        )}

        
        

        {/* ✅ Step 5: Payment Upload */}
        {step === 5 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Payment</h2>
            <p>Upload proof of payment. Use your student code <b>{studentCode}</b> as narration.</p>
            <input type="file" name="paymentProof" onChange={handleChange} required />
            <div className="form-navigation">
              <button type="button" onClick={() => setStep(4)}>Back</button>
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Next"}
              </button>
            </div>
          </form>
        )}


        {/* 🔹 Existing steps remain unchanged until Confirm step */}

        {/* ✅ Step 6: Confirm Details */}
        {step === 6 && (
          <form className="form-step" onSubmit={handleSubmit}>
            <h2>Confirm Your Details</h2>
            <table className="form-table">
              <tbody>
                <tr><td>Full Name</td><td>{formData.firstName} {formData.middleName} {formData.surname}</td></tr>
                <tr><td>Email</td><td>{formData.studentEmail}</td></tr>
                <tr><td>Date of Birth</td><td>{formData.dob}</td></tr>
                <tr><td>Class Applied</td><td>{formData.classInterest}</td></tr>
                <tr><td>Present School</td><td>{formData.presentSchool}</td></tr>
                <tr><td>Nationality</td><td>{formData.nationality}</td></tr>
                <tr><td>State of Origin</td><td>{formData.stateOfOrigin}</td></tr>
                <tr><td>Parent Name</td><td>{formData.parentName}</td></tr>
                <tr><td>Parent Phone</td><td>{formData.parentPhone}</td></tr>
                <tr><td>Parent Email</td><td>{formData.parentEmail}</td></tr>
                <tr><td>Parent Address</td><td>{formData.parentAddress}</td></tr>
                <tr><td>Total Fees</td><td>₦230,000</td></tr>
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

        {/* ✅ Step 7: Success with Download Slip */}
        {step === 7 && (
          <div className="form-step success-box">
            <h2>✅ Application Submitted Successfully!</h2>
            <p>Your Student Code is: <span className="student-code">{studentCode}</span></p>
            <p>⚠️ Keep this code safe. It will be required for <b>Parents Forum access</b>.</p>

            {/* Printable Slip */}
            <div className="printable-slip" id="printable-slip">
              <h2>Vincent C Academy</h2>
              <p><b>Secondary Registration Slip</b></p>
              <hr />
              <table>
                <tbody>
                  <tr><td>Student Name</td><td>{formData.firstName} {formData.middleName} {formData.surname}</td></tr>
                  <tr><td>Student Code</td><td><b>{studentCode}</b></td></tr>
                  <tr><td>Date of Birth</td><td>{formData.dob}</td></tr>
                  <tr><td>Class Applied</td><td>{formData.classInterest}</td></tr>
                  <tr><td>Parent Name</td><td>{formData.parentName}</td></tr>
                  <tr><td>Parent Phone</td><td>{formData.parentPhone}</td></tr>
                  <tr><td>Total Fees</td><td>₦230,000</td></tr>
                  <tr><td>Registration Date</td><td>{new Date().toLocaleDateString()}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Download Button */}
            <button type="button" onClick={handleDownloadSlip} className="download-btn">
              ⬇️ Download Registration Slip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

     
