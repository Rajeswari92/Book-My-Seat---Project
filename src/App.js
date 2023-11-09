import React from "react";
import "./App.css";
import { useState } from "react";
import { TbArmchair } from "react-icons/tb";
import Seat from "./components/Seat/Seat";

function App() {
  const [ticketType, setTicketType] = useState("Standard");
  const [quantityOfTicket, setQuantityOfTicker] = useState("");

  const ticketTypeHandler = (event) => {
    setTicketType(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantityOfTicker(event.target.value);
  };

  return (
    <div className="main_container">
      <div className="main_container_inner">
        <div className="header">
          <h2>Book My Show!</h2>
          <p>Movie Title: LEO</p>
          <p>Movie Time: 6:00 PM</p>
        </div>

        <div className="App">
          <div className="left">
            <div className="dropdown">
              <label htmlFor="tickettype">Ticket Type:</label>
              <select
                id="tickettype"
                value={ticketType}
                onChange={ticketTypeHandler}
              >
                <option value="Standard">Standard - ₹100</option>
                <option value="Premium">Premium - ₹150</option>
              </select>

              <label htmlFor="qty">Ticket Quantity:</label>
              <select
                id="qty"
                value={quantityOfTicket}
                onChange={quantityHandler}
              >
                <option value="">Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <Seat type={ticketType} quantityOfTicket={quantityOfTicket} />
          </div>
          <div className="right">
            <div>
              <h3>Key to Seat Layout:</h3>
              <ul>
                <li>
                  <TbArmchair
                    className="available seat"
                    style={{ width: "30px", height: "35px" }}
                  />
                  <p> Standard Seat Available</p>
                </li>

                <li>
                  <TbArmchair className="unavailable size" />
                  <p>Unavailable</p>
                </li>

                <li>
                  <TbArmchair className="yourselection size" />
                  <p>Your Selection</p>
                </li>

                <li>
                  <TbArmchair className="premiumcolor size " />
                  <p>Premium Seat Available</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
