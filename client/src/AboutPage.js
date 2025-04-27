// AboutPage.js
import React from "react";

function AboutPage() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>About SolarSave 🌞</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Driving Sustainability and Ethical Growth</h2>
        <p style={styles.mission}>
          At SolarSave, we believe that clean, renewable energy is key to creating a more sustainable and equitable future. 
          By helping homeowners adopt solar power, we promote an energy system that reduces environmental harm, 
          lowers household costs, and supports long-term resilience.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Empowering Individuals</h2>
        <p style={styles.mission}>
          Our platform empowers individuals with clear information, personalized tools, and practical pathways to transition to solar energy. 
          We connect personal financial savings with broader environmental impact, showing that profit and purpose can go hand in hand.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Building a Sustainable Future</h2>
        <p style={styles.mission}>
          By making solar accessible and transparent, SolarSave is helping build a future where sustainable choices are the norm — not the exception.
        </p>
      </div>

      <p style={styles.footer}>🌍 Empowering a greener tomorrow.</p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to top right,rgb(0, 0, 0) 40%, #f8b500) 80%",
    padding: "3rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "white",
  },
  section: {
    marginBottom: "2.5rem",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    color: "white",
    marginBottom: "0.8rem",
  },
  mission: {
    fontSize: "1.2rem",
    color: "white",
    lineHeight: "1.7",
  },
  footer: {
    marginTop: "3rem",
    fontSize: "1rem",
    color: "#ff9900",
  },
};

export default AboutPage;
