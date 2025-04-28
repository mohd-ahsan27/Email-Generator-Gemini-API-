import React, { useState } from 'react';

const EmailOutput = ({
  content,
  copyToClipboard,
  regenerate,
  resetAll,
  goBack,
  goForward,
  showBackButton,
  showForwardButton
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerateClick = async () => {
    setIsRegenerating(true);
    await regenerate(); // Wait for regeneration
    setIsRegenerating(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-3xl mx-auto">
      
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-4">
        {showBackButton ? (
          <button
            onClick={goBack}
            className="text-blue-600 hover:underline font-semibold"
          >
            ⬅️ Back
          </button>
        ) : <div />}

        {showForwardButton && (
          <button
            onClick={goForward}
            className="text-blue-600 hover:underline font-semibold"
          >
            Forward ➡️
          </button>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 text-center">Generated Email:</h2>

      <p className="whitespace-pre-wrap mb-4">{content}</p>

      <div className="flex flex-col gap-2">
        <button
          onClick={copyToClipboard}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
        >
          📋 Copy to Clipboard
        </button>

        <button
          onClick={handleRegenerateClick}
          disabled={isRegenerating}
          className={`${
            isRegenerating ? 'bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'
          } text-white py-2 rounded-md`}
        >
          {isRegenerating ? 'Generating... ⏳' : '🔄 Regenerate'}
        </button>

        <button
          onClick={resetAll}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
        >
          🗑️ Reset All
        </button>
      </div>
    </div>
  );
};

export default EmailOutput;
