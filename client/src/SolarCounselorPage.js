import React, { useState, useEffect } from "react";

function SolarCounselorPage() {
  const [userInput, setUserInput] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dots, setDots] = useState("");

  const suggestedQuestions = [
    "What is net metering?",
    "What are the solar incentives in California?",
    "Do solar panels work on cloudy days?",
    "Can solar panels eliminate my electric bill?",
    "what are the disadvantages of solar energy?",
  ];

  const handleSuggestedClick = (question) => {
    setUserInput(question);
    setTimeout(() => {
      document.getElementById('solar-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsThinking(true);
    setIsTyping(false);
    setFullResponse("");
    setDisplayedResponse("");

    try {
      const res = await fetch("/ask-counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await res.json();

      if (data.response) {
        setTimeout(() => {
          setFullResponse(data.response);
          setIsThinking(false);
          setIsTyping(true);
        }, 1000);
      } else {
        setFullResponse("I don't have the answer for that right now. Please try asking again later! 🌥️");
        setIsThinking(false);
      }
    } catch (error) {
      console.error(error);
      setFullResponse("Error reaching Solar Counselor. Please try again later!");
      setIsThinking(false);
    }
  };

  // Typing letter-by-letter
  useEffect(() => {
    if (!isTyping || !fullResponse) return;

    let index = 0;
    let currentText = "";

    const typingInterval = setInterval(() => {
      currentText += fullResponse[index];
      setDisplayedResponse(currentText);
      index++;

      if (index >= fullResponse.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isTyping, fullResponse]);

  // Flying dots animation
  useEffect(() => {
    if (!isThinking) {
      setDots("");
      return;
    }

    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setDots(".".repeat(count));
    }, 500);

    return () => clearInterval(interval);
  }, [isThinking]);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Solar Counselor ☀️🧠</h1>
      <p style={styles.description}>
        Ask any question about solar energy, installation, or government incentives in your state.  
        Our Counselor is here to help!
      </p>

      <form id="solar-form" onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ask me anything about solar..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Ask Counselor</button>
      </form>

      <div style={styles.suggestedBox}>
        <h3 style={styles.suggestedTitle}>Suggested Questions:</h3>
        <div style={styles.suggestedList}>
          {suggestedQuestions.map((q, index) => (
            <button 
              key={index}
              style={styles.suggestedButton}
              onClick={() => handleSuggestedClick(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {(isThinking || isTyping || fullResponse) && (
        <div style={styles.responseBox}>
          {isThinking ? (
            <p><em>Solar Counselor is typing{dots}</em> 🌞⌛</p>
          ) : (
            <p>{displayedResponse}</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to left, #fceabb, #f8b500)",
    padding: "3rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  form: {
    marginBottom: "2rem",
  },
  input: {
    padding: "10px",
    width: "300px",
    fontSize: "16px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  suggestedBox: {
    marginTop: "2rem",
  },
  suggestedTitle: {
    fontSize: "1.5rem",
    color: "#444",
    marginBottom: "1rem",
  },
  suggestedList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  suggestedButton: {
    padding: "8px 12px",
    backgroundColor: "#f8b500",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s",
  },
  responseBox: {
    marginTop: "2rem",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "1.1rem",
    color: "#333",
  },
};

export default SolarCounselorPage;
