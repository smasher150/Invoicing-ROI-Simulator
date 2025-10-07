import React, { useState } from 'react';

function EmailModal({ onSubmit, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    onSubmit(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>📧 Enter Your Email</h2>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
          Enter your email address to unlock and download the PDF report.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your.email@example.com"
              autoFocus
            />
            {error && (
              <small style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                {error}
              </small>
            )}
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Generate Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailModal;