

import React from "react";

export default function AboutUs() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>

      <p style={styles.text}>
        Welcome to our application! We are dedicated to providing the best
        experience for our users by building simple, fast, and reliable web
        solutions.
      </p>

      <p style={styles.text}>
        Our team focuses on modern technologies like React JS to create
        user-friendly interfaces and scalable applications.
      </p>

      <p style={styles.text}>
        We continuously improve our skills and products to deliver high-quality
        results and ensure customer satisfaction.
      </p>

      <div style={styles.box}>
        <h2>Our Mission</h2>
        <p>
          To build innovative and efficient solutions that make people's lives
          easier.
        </p>
      </div>

      <div style={styles.box}>
        <h2>Our Vision</h2>
        <p>
          To become a trusted platform known for quality, performance, and
          simplicity.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  box: {
    backgroundColor: "#f5f5f5",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "20px",
  },
};