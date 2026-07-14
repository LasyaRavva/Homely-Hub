import React from "react";

const PropertyAmenities = ({ amenities }) => {
  return (
    <>
      <h2 className="property-amenities">What this place offers</h2>
      <div className="amenities">
        {amenities.map((amenity, index) => (
          <p key={index} className="amenity-item">
            <span className="material-symbols-outlined amenity-icon">
              {amenity.icon}
            </span>
            <span className="amenity-name">{amenity.name}</span>
          </p>
        ))}
      </div>
    </>
  );
};

export default PropertyAmenities;
