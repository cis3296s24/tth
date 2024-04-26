import React from "react";
/**
 * Represents the Help page.
 * @returns JSX.Element representing the Help page.
 */
const Help = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: 0,
        padding: "0 20px",
      }}
    >
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "20px" }}>
        Need Help?
      </h2>
      <p style={{ fontSize: "1.25rem", fontWeight: 500, textAlign: "center" }}>
        If you have any questions or need assistance, please contact our customer support team at support.catdog@temple.edu.
      </p>
      <p style={{ fontSize: "1.25rem", fontWeight: 500, textAlign: "center" }}>
        Our team is available 24/7 to help you with any issues or concerns you may have.
      </p>
    </div>
  );
};

export default Help;

