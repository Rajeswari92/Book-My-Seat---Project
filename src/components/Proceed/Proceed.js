import React from "react";
import "./Proceed.css";

function Proceed({ isOpen, onClose, quantity, ticketType }) {
  return (
    isOpen && (
      <div className="modal-backdrop">
        <div className="modal-card">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h3>Details: </h3>
          <br></br>
          <p>
            <em>Number of seats booked: {quantity}</em>
          </p>
          <p>
            <em>Ticket Type: {ticketType}</em>
          </p>
          <span>Total Amount of Ticket : ₹</span>
          {ticketType === "Standard" ? quantity * 150 : quantity * 100}
          <div style={{ color: "green" }}>Ticket Booked! Welcome!</div>
        </div>
      </div>
    )
  );
}

export default Proceed;
