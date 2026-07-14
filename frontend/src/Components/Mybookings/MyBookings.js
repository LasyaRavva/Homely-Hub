import React, { useEffect } from "react";
import "../../CSS/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {
  fetchUserBookings,
  fetchBookingDetails,
} from "../../Store/Booking/booking-action";
import LoadingSpinner from "../LoadingSpinner";

const MyBookings = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {bookings,loading}=useSelector((state)=>state.booking);
  const fallbackImage = "";
   useEffect(()=>{
      dispatch(fetchUserBookings());

   },[dispatch]);

   const handleBookingClick=(bookingId)=>{
    dispatch(fetchBookingDetails(bookingId));
    navigate(`/user/booking/${bookingId}`);
   };
   if(bookings.length===0 && !loading){
   return<div>My Bookings are not available</div>
   }
  return (
    <>
      <ProgressSteps />
      <div className="wow">
        {loading && <LoadingSpinner />}
        {!loading &&
         bookings.length > 0 &&
          bookings.map((booking) => {
              const property = booking?.property;
              const propertyImage =
                property?.images && property.images.length > 0
                  ? property.images[0].url
                  : fallbackImage;

              return (
            <div
              onClick={() => handleBookingClick(booking._id)}
              key={booking._id}
            >
              <div className="main-container">
                <div className="mybookings-container row">
                  <div className="image-container col-lg-3 col-md-3">
                    <img
                      className="booking-img"
                      src={propertyImage}
                      alt={property?.propertyName || "bookings"}
                      onError={(event) => {
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  </div>
                  <div className="booking-information col-lg-9 col-md-9">
                    <h6 className="hotel-name">
                      {property?.propertyName || "Property no longer available"}
                    </h6>
                    <div className="stay-information">
                      <span className="info">
                        <span className="material-symbols-outlined icon">
                          bedtime
                        </span>
                        {booking.numberOfnights} nights
                      </span>
                      <span className="info">
                        <span className="material-symbols-outlined icon">
                          calendar_month
                        </span>
                        {new Date(booking.fromDate).toLocaleDateString()}
                      </span>
                      <span className="material-symbols-outlined icon">
                        arrow_forward
                      </span>
                      <span className="info">
                        <span className="material-symbols-outlined icon">
                          calendar_month
                        </span>
                        {new Date(booking.toDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h5 className="booking-price">
                      <span className="material-symbols-outlined">
                        payments
                      </span>{" "}
                      Total Price :&#8377; {booking.price}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
              );
          })}
      </div>
    </>
  );
};

export default MyBookings;
