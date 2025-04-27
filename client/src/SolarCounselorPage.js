import React, { useState, useEffect } from "react";

function SolarCounselorPage() {
  const [userInput, setUserInput] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsThinking(true); // "Thinking..." mode
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
          setIsThinking(false); // stop thinking
          setIsTyping(true);    // start typing animation
        }, 1000); // Artificial 1 second "thinking..." delay
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
    }, 30); // Typing speed
  
    return () => clearInterval(typingInterval);
  }, [isTyping, fullResponse]);
  

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Solar Counselor ☀️🧠</h1>
      <p style={styles.description}>
        Ask any question about solar energy, installation, or government incentives in your state.  
        Our Counselor is here to help!
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Ask me anything about solar..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Ask Counselor</button>
      </form>

      {(isThinking || isTyping || fullResponse) && (
        <div style={styles.responseBox}>
          {isThinking ? (
            <p><em>Solar Counselor is typing...</em> 🌞⌛</p>
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
