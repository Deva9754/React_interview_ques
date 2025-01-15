import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <h1>My Application</h1>
        <nav>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Sign Up</Link>
        </nav>
      </header>
      <main style={styles.mainContent}>
        {children} {/* Render the page content here */}
      </main>
      <footer style={styles.footer}>
        <p>© 2025 My Application</p>
      </footer>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: '10px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  footer: {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
  },
};

export default Layout;
