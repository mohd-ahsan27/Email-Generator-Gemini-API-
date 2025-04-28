import React, { useState } from 'react';

const LayoutEmailGenerator = ({ emailType, setEmailType, emailTone, setEmailTone, keywords, setKeywords, handleGenerate }) => {
  const [loading, setLoading] = useState(false); //  loading state

  const handleGenerateClick = async () => {
    setLoading(true); // Start loading
    await handleGenerate(); // Wait for generation
    setLoading(false); // Stop loading
  };

  let buttonClassName = 'w-full text-white py-3 rounded-md text-lg font-semibold transition-all ';
  if (loading) {
    buttonClassName += 'bg-gray-400'; // If loading, gray button
  } else {
    buttonClassName += 'bg-blue-600 hover:bg-blue-700'; // If not loading, blue button
  }

  let buttonText = '';
  if (loading) {
    buttonText = 'Generating... ⏳';
  } else {
    buttonText = 'Generate Email Drafts';
  }

  return (
    
    <div className="bg-white rounded-2xl shadow-md p-8 w-full space-y-6">
      <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
        <span>📧</span> Smart Email Generator
      </h1>

      {/* Email Type */}
      <div>
        <label className="block font-semibold mb-1">Email Type:</label>
        <select
          value={emailType}
          onChange={(e) => setEmailType(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* options */}
          <option>Thank You</option>
          <option>Follow Up</option>
          <option>Apology</option>
          <option>Request</option>
          <option>Introduction</option>
          <option>Job Application</option>
          <option>Welcome</option>
          <option>Congratulations</option>
          <option>Invitation</option>
          <option>Promotion</option>
          <option>Resignation</option>
          <option>Invoice Submission</option>
          <option>Holiday Announcement</option>
          <option>Customer Feedback Request</option>
        </select>
      </div>

      {/* Email Tone */}
      <div>
        <label className="block font-semibold mb-1">Email Tone:</label>
        <select
          value={emailTone}
          onChange={(e) => setEmailTone(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {/* options */}
          <option>Assertive</option>
          <option>Friendly</option>
          <option>Professional</option>
          <option>Casual</option>
          <option>Formal</option>
          <option>Persuasive</option>
          <option>Sympathetic</option>
          <option>Urgent</option>
          <option>Apologetic</option>
          <option>Motivational</option>
          <option>Polite</option>
          <option>Excited</option>
          <option>Sincere</option>
        </select>
      </div>

      {/* Keywords */}
      <div>
        <label className="block font-semibold mb-1">Keywords or Idea:</label>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="E.g. Rescheduling meeting, project delay apology"
          className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateClick}
        disabled={loading}
        className={buttonClassName}
      >
        {buttonText}
      </button>

    </div>
  );
};

export default LayoutEmailGenerator;


