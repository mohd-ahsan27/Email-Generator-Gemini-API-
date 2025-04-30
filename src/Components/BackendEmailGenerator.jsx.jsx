import React, { useState } from "react";
import LayoutEmailGenerator from "../Components/EmailInput";
import EmailOutput from "../Components/OutputEmailGenerator";

const SmartEmailGenerator = () => {
  const [emailType, setEmailType] = useState("Thank You");
  const [emailTone, setEmailTone] = useState("Friendly");
  const [keywords, setKeywords] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const API_KEY = "AIzaSyB-tNhZhsObpWwFWyX04YXr0Aq7sQQ_5GA";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const generateEmail = async () => {
    if (!keywords) {
      alert("⚠️ Please enter keywords or an idea for the email");
      return;
    }

    try {
      const prompt = `Compose a ${emailTone} ${emailType} email focusing on: ${keywords}. Keep the email concise and to the point,Make sure the message is clear and actionable.`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        const newEmailList = [...emailList, generatedText];
        setEmailList(newEmailList);
        setCurrentIndex(newEmailList.length - 1);
      } else {
        alert("Failed to generate email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating email.");
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < emailList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const copyToClipboard = () => {
    if (emailList[currentIndex]) {
      navigator.clipboard.writeText(emailList[currentIndex]);
      alert("Copied to clipboard!");
    }
  };

  const resetAll = () => {
    setEmailList([]);
    setCurrentIndex(-1);
    setKeywords("");
    alert("Reset Successful!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 space-y-6">
      {/* If no email generated yet, center the input form */}
      {emailList.length === 0 ? (
        <div className="w-full max-w-2xl">
          <LayoutEmailGenerator
            emailType={emailType}
            setEmailType={setEmailType}
            emailTone={emailTone}
            setEmailTone={setEmailTone}
            keywords={keywords}
            setKeywords={setKeywords}
            handleGenerate={generateEmail}
          />
        </div>
      ) : (
        // After generation, arrange input and output
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Input Form - Left Side */}
          <div className="flex-1">
            <LayoutEmailGenerator
              emailType={emailType}
              setEmailType={setEmailType}
              emailTone={emailTone}
              setEmailTone={setEmailTone}
              keywords={keywords}
              setKeywords={setKeywords}
              handleGenerate={generateEmail}
            />
          </div>

          {/* Output Section - Right Side */}
          <div className="flex-1">
            <EmailOutput
              content={emailList[currentIndex]}
              copyToClipboard={copyToClipboard}
              regenerate={generateEmail}
              resetAll={resetAll}
              goBack={goBack}
              goForward={goForward}
              showBackButton={currentIndex > 0}
              showForwardButton={currentIndex < emailList.length - 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartEmailGenerator;
