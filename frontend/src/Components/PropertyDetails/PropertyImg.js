import React,{useState} from 'react';
import Modal from "./Modal";
const PropertyImg = ({images}) => {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const hasImages = Array.isArray(images) && images.length > 0;
    const handleShowAllPhotos=()=>{
      setIsModalOpen(true);
    };
    const handleCloseModal=()=>{
      setIsModalOpen(false);
    };
  return (
    <>
  <div className="property-img-container">
    {hasImages ? (
      <>
        <div className="img-item first-image">
          <img className="images" src={images[0].url} alt="property-1"/>
        </div>
        {images.slice(1,5).map((image,index)=>(
          <div key={index} className="img-item">
            <img
            className="images"
            src={image.url}
            alt={`property-${index+2}`}
            />
          </div>
        ))}
      </>
    ) : (
      <div className="img-item first-image">
        <div className="images" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          No images available
        </div>
      </div>
    )}
  </div>

  <div className="similar-photos-container">
    <button className="similar-photos" 
    onClick={handleShowAllPhotos}
    disabled={!hasImages}>
      <span className="material-symbols-outlined">photo_library</span>


    </button>
  </div>
  {isModalOpen && hasImages && <Modal images={images} onClose={handleCloseModal}/>}
    </>
  );
};

export default PropertyImg;
