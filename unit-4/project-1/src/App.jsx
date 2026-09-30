
import React, { useState } from "react";

function App() {
  const initialForm = {
    username: "",
    aadharName: "",
    email: "",
    countryCode: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    permanentAddress: "",
    tempAddress: "",
    photo: null,
    dob: "",
    gender: "",
    occupation: "",
    hobbies: "",
    altPhone: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setSuccess(false);
  };

  const setError = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess(false);

    let isValid = true;
    const newErrors = {};

    const username = form.username.trim();
    const aadharName = form.aadharName.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();
    const countryCode = form.countryCode;
    const password = form.password;
    const confirmPassword = form.confirmPassword;
    const permanentAddress = form.permanentAddress.trim();
    const tempAddress = form.tempAddress.trim();
    const photo = form.photo;

    // Username
    if (username === "") {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    // Aadhar Name
    if (aadharName === "") {
      newErrors.aadharName = "Aadhar name is required.";
      isValid = false;
    } else if (
      username !== "" &&
      aadharName.toLowerCase() !== username.toLowerCase()
    ) {
      newErrors.aadharName = "Aadhar name must match the username.";
      newErrors.username = "Username and Aadhar name do not match.";
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    // Country Code
    if (countryCode === "") {
      newErrors.mobile = "Select a country code.";
      isValid = false;
    }

    // Mobile
    const mobilePattern = /^[0-9]{10}$/;

    if (mobile === "") {
      newErrors.mobile = "Mobile number is required.";
      isValid = false;
    } else if (!mobilePattern.test(mobile)) {
      newErrors.mobile = "Enter exactly 10 digits.";
      isValid = false;
    }

    // Password
    if (password === "") {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    // Confirm Password
    if (confirmPassword === "") {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    // Permanent Address
    if (permanentAddress === "") {
      newErrors.permanentAddress = "Permanent address is required.";
      isValid = false;
    }

    // Temporary Address
    if (tempAddress === "") {
      newErrors.tempAddress = "Temporary address is required.";
      isValid = false;
    }

    // Photo
    if (!photo) {
      newErrors.photo = "Please upload a photo.";
      isValid = false;
    } else {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(photo.type)) {
        newErrors.photo = "Only JPG or PNG files are allowed.";
        isValid = false;
      } else if (photo.size > maxSize) {
        newErrors.photo = "File size must be under 2MB.";
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setSuccess(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSuccess(false);
  };

  return (
    <div style={styles.body}>
      <div style={styles.wrap}>
        <h1 style={styles.heading}>User Registration Form</h1>

        <p style={styles.subtitle}>
          Fields marked with * are mandatory and are validated
        </p>

        <div style={styles.note}>
          Note: Username must exactly match the name entered in the Aadhar Name
          field.
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div style={styles.field}>
            <label style={styles.label}>
              Username<span style={styles.req}>*</span>
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />

            <span style={styles.error}>{errors.username}</span>
          </div>

          {/* Aadhar Name */}
          <div style={styles.field}>
            <label style={styles.label}>
              Aadhar Name<span style={styles.req}>*</span>
            </label>

            <input
              type="text"
              name="aadharName"
              value={form.aadharName}
              onChange={handleChange}
              style={styles.input}
            />

            <span style={styles.error}>{errors.aadharName}</span>
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>
              Email<span style={styles.req}>*</span>
            </label>

            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />

            <span style={styles.error}>{errors.email}</span>
          </div>

          {/* Mobile */}
          <div style={styles.field}>
            <label style={styles.label}>
              Mobile Number<span style={styles.req}>*</span>
            </label>

            <div style={styles.phoneRow}>
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                style={styles.countryCode}
              >
                <option value="">Code</option>
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+971">+971 (UAE)</option>
              </select>

              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                maxLength="10"
                placeholder="10 digit number"
                style={styles.input}
              />
            </div>

            <span style={styles.error}>{errors.mobile}</span>
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>
              Password<span style={styles.req}>*</span>
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />

            <span style={styles.error}>{errors.password}</span>
          </div>

          {/* Confirm Password */}
          <div style={styles.field}>
            <label style={styles.label}>
              Confirm Password<span style={styles.req}>*</span>
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />

            <span style={styles.error}>{errors.confirmPassword}</span>
          </div>

          {/* Permanent Address */}
          <div style={styles.fullField}>
            <label style={styles.label}>
              Permanent Address<span style={styles.req}>*</span>
            </label>

            <textarea
              name="permanentAddress"
              value={form.permanentAddress}
              onChange={handleChange}
              style={styles.textarea}
            />

            <span style={styles.error}>{errors.permanentAddress}</span>
          </div>

          {/* Temporary Address */}
          <div style={styles.fullField}>
            <label style={styles.label}>
              Temporary Address<span style={styles.req}>*</span>
            </label>

            <textarea
              name="tempAddress"
              value={form.tempAddress}
              onChange={handleChange}
              style={styles.textarea}
            />

            <span style={styles.error}>{errors.tempAddress}</span>
          </div>

          {/* Photo */}
          <div style={styles.field}>
            <label style={styles.label}>
              Upload Photo (jpg/png, max 2MB)
              <span style={styles.req}>*</span>
            </label>

            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              style={styles.input}
            />

            <span style={styles.error}>{errors.photo}</span>
          </div>

          {/* Date of Birth */}
          <div style={styles.field}>
            <label style={styles.label}>Date of Birth</label>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Gender */}
          <div style={styles.field}>
            <label style={styles.label}>Gender</label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Occupation */}
          <div style={styles.field}>
            <label style={styles.label}>Occupation</label>

            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Hobbies */}
          <div style={styles.field}>
            <label style={styles.label}>Hobbies</label>

            <input
              type="text"
              name="hobbies"
              value={form.hobbies}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Alternate Phone */}
          <div style={styles.field}>
            <label style={styles.label}>Alternate Phone Number</label>

            <input
              type="text"
              name="altPhone"
              value={form.altPhone}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Success Message */}
          {success && (
            <div style={styles.successMsg}>
              Registration submitted successfully!
            </div>
          )}

          {/* Buttons */}
          <div style={styles.actions}>
            <button type="submit" style={styles.submitBtn}>
              Submit
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={styles.resetBtn}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  body: {
    margin: 0,
    minHeight: "100vh",
    padding: "40px 16px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: "#eeeeee",
    color: "#222",
    boxSizing: "border-box",
  },

  wrap: {
    maxWidth: "820px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px 28px",
  },

  heading: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    margin: "0 0 6px",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    fontSize: "0.9rem",
    marginBottom: "26px",
  },

  note: {
    background: "#f5f5f5",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "0.82rem",
    color: "#555",
    marginBottom: "22px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    width: "calc(50% - 10px)",
    minWidth: "220px",
    marginBottom: "18px",
  },

  fullField: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "18px",
  },

  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#333",
  },

  req: {
    color: "#d33",
    marginLeft: "3px",
  },

  input: {
    padding: "11px 12px",
    borderRadius: "9px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    background: "#fafafa",
    boxSizing: "border-box",
  },

  textarea: {
    padding: "11px 12px",
    borderRadius: "9px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    background: "#fafafa",
    minHeight: "60px",
    resize: "vertical",
  },

  phoneRow: {
    display: "flex",
    gap: "8px",
  },

  countryCode: {
    flex: "0 0 110px",
    padding: "11px 12px",
    borderRadius: "9px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    background: "#fafafa",
  },

  error: {
    color: "#d33",
    fontSize: "0.78rem",
    marginTop: "4px",
    minHeight: "14px",
  },

  actions: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginTop: "10px",
  },

  submitBtn: {
    padding: "12px 32px",
    borderRadius: "10px",
    border: "none",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    background: "#2b2b2b",
    color: "#fff",
  },

  resetBtn: {
    padding: "12px 32px",
    borderRadius: "10px",
    border: "none",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    background: "#e5e5e5",
    color: "#333",
  },

  successMsg: {
    width: "100%",
    background: "#e6f7ec",
    border: "1px solid #34a853",
    color: "#1e7e3c",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "0.9rem",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default App;

