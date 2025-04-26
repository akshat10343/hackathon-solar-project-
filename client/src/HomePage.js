import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>SolarSave</h1>
        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/features" style={styles.link}>Features</Link></li>
          <li><Link to="/about" style={styles.link}>About Us</Link></li>
          <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        </ul>
      </nav>
      <div style={styles.content}>
        <h2 style={styles.heading}>Harness the Power of the Sun</h2>
        <p style={styles.subheading}>Calculate your savings and reduce your carbon footprint with SolarSave.</p>
        <Link to="/calculate" style={styles.ctaButton}>Get Started</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #fceabb, #f8b500)',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  },
  content: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  ctaButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#ff9900',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default HomePage;
