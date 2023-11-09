import React from "react";
import "./Seat.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { TbArmchair } from "react-icons/tb";
import screenImg from "../../images/screen-img.png";
import Proceed from "../Proceed/Proceed";

function Seat(props) {
  const layout = [
    [
      0, 0, 461, 1, 2, 0, 3, 4, 5, 6, 0, 7, 8, 0, 9, 10, 0, 11, 12, 13, 14, 0,
      563, 564, 454,
    ],
    [
      0, 0, 462, 15, 16, 0, 17, 18, 19, 20, 0, 21, 22, 0, 23, 24, 0, 25, 26, 27,
      28, 0, 565, 566, 567,
    ],
    [
      0, 0, 0, 29, 30, 31, 32, 33, 34, 35, 36, 37, 0, 0, 0, 39, 40, 41, 42, 43,
      44, 45, 568, 569,
    ],
    [
      0, 0, 0, 46, 47, 48, 49, 50, 51, 52, 53, 54, 0, 0, 0, 56, 57, 58, 59, 60,
      61, 62, 987, 570,
    ],
    [
      0, 0, 0, 63, 64, 65, 67, 68, 69, 70, 71, 72, 0, 0, 0, 74, 75, 76, 77, 78,
      79, 80, 890, 891,
    ],
    [
      0, 0, 0, 81, 82, 83, 84, 85, 86, 87, 88, 89, 0, 0, 0, 91, 92, 93, 94, 95,
      96, 97, 999, 892,
    ],
    [
      0, 0, 0, 98, 99, 100, 101, 102, 103, 104, 105, 106, 0, 0, 0, 108, 109,
      110, 111, 112, 113, 114, 888, 893,
    ],
    [
      0, 0, 0, 118, 119, 120, 121, 122, 123, 124, 125, 126, 0, 0, 0, 128, 129,
      130, 132, 132, 133, 134, 777, 778,
    ],
    [
      0, 0, 0, 138, 139, 140, 141, 142, 143, 144, 145, 146, 0, 0, 0, 148, 149,
      150, 151, 152, 153, 154, 666, 678,
    ],
    [
      0, 0, 0, 155, 156, 157, 158, 159, 160, 161, 162, 163, 0, 0, 0, 165, 166,
      167, 168, 169, 170, 171, 555, 556,
    ],
  ];

  let ticketNumber = props.quantityOfTicket;
  let ticketType = props.type;

  const [seats, setSeats] = useState(
    layout.map((item, index) =>
      item.map((data) => ({
        id: data,
        isZero: data,
        isSelected: false,
        isBooked: false,
        type: index > 1 ? "Standard" : "Premium",
      }))
    )
  );

  const [selectedSeats, setSelectedSeats] = useState(
    seats.flat().filter((item) => item.isSelected).length
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  function resetSelection(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j].isSelected = false;
      }
    }
    return arr;
  }

  const bookHandler = (seatId, seat) => {
    console.log(seat);
    let unSelectPrev = resetSelection(seats);

    if (ticketNumber === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select ticket quantity",
      });
      return;
    }
    if (seat.type !== props.type) {
      Swal.fire({
        icon: "info",
        title: "Info",
        text: "Please select a ticket of type " + props.type,
      });
      return;
    }
    Swal.fire({
      title: "Updating...",
      html: "Please wait...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      onOpen: () => {
        Swal.showLoading();
      },
    });

    const updatedSeats = unSelectPrev.map((row) => {
      return row.map((seat) => {
        if (seat.id === seatId && !seat.isBooked) {
          // Get the index of the selected seat in the current row
          const seatIndex = row.indexOf(seat);

          let selectedCount = 0;
          // Count the number of selected seats in the current row
          row.forEach((s) => {
            if (s.isSelected) {
              selectedCount++;
            }
          });

          if (selectedCount < ticketNumber) {
            // Select seats in the same row up to ticketNumber
            for (let i = seatIndex; i < row.length; i++) {
              if (row[i].id !== 0 && !row[i].isBooked && !row[i].isSelected) {
                row[i].isSelected = true;
                selectedCount++;
              }
              if (selectedCount >= ticketNumber) {
                break;
              }
            }
          }
        }
        return seat;
      });
    });
    setTimeout(() => {
      setSeats(updatedSeats);
      setSelectedSeats(selectedSeats + 1);
      Swal.close();
    }, 1500);

    setSeats(updatedSeats);
    setSelectedSeats(selectedSeats + 1);
  };
  const proceedHandler = () => {
    if (ticketNumber === "") {
      Swal.fire({
        icon: "error",
        title: "Please select ticket quantity",
      });
      return;
    }

    console.log("Before seat selection update:", seats);

    setSeats(
      seats.map((item) =>
        item.map((data) => {
          if (data.isSelected) {
            return { ...data, isBooked: true, isSelected: false };
          } else {
            return data;
          }
        })
      )
    );

    console.log("After seat selection update:", seats);
    Swal.fire({
      icon: "success",
      title: "Booking successful!",
      showConfirmButton: false,
      timer: 1500,
    });
    setIsModalOpen(true);
    setSelectedSeats(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      {seats.map((row, index1) => {
        return (
          <div key={index1} style={{ display: "flex", width: "100%" }}>
            <div
              style={{ width: "40px", marginTop: "15px", marginLeft: "10px" }}
            >
              {String.fromCharCode(69 + index1)}
            </div>
            {row.map((seat, index2) => (
              <>
                <p key={index2}></p>
                {seat.isZero !== 0 ? (
                  <TbArmchair
                    onClick={() => bookHandler(seat.id, seat)}
                    className={`${
                      seat.isBooked
                        ? "booked"
                        : seat.isSelected
                        ? "selected"
                        : seat.type === "Premium"
                        ? "premiumcolor"
                        : "available hover seat"
                    }`}
                    style={{ width: "3.5%", height: "40px", color: "black" }}
                  />
                ) : (
                  <span style={{ marginRight: "3.5%" }}></span>
                )}
              </>
            ))}
          </div>
        );
      })}
      <div className="imageScreen">
        <img src={screenImg} alt="Screen img" />
        <p>All eyes this way please!</p>
      </div>
      <br></br>
      <button className="pay_btn" onClick={proceedHandler}>
        Book Ticket
      </button>

      {ticketNumber > 0 && isModalOpen && (
        <>
          {/* {showConfetti && <Confetti />} */}
          <Proceed
            isOpen={isModalOpen}
            onClose={closeModal}
            quantity={ticketNumber}
            ticketType={ticketType}
          />
        </>
      )}
    </div>
  );
}

export default Seat;
