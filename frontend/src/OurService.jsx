import React from "react";

export default function OurServices() {
  const services = [
    {
      title: "Web Development",
      description: "We build responsive and high-performance websites using modern technologies.",
      icon: "🌐"
    },
    {
      title: "App Development",
      description: "Custom mobile applications for Android and iOS platforms.",
      icon: "📱"
    },
    {
      title: "UI/UX Design",
      description: "Creative and user-friendly interface designs for better user experience.",
      icon: "🎨"
    },
    {
      title: "Digital Marketing",
      description: "Boost your business with SEO, social media marketing, and campaigns.",
      icon: "📢"
    }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Services</h2>

      <div style={styles.cardContainer}>
        {services.map((service, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#f9f9f9"
  },
  heading: {
    marginBottom: "30px",
    fontSize: "28px"
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    transition: "transform 0.3s"
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px"
  }
};