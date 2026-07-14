import React, { useEffect, useState } from "react";
import FliterModal from "./FilterModal";
import { useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Filter = () => {
    //state for controlling modal visability.
    const [isModalOpen, setIsModalOpen] = useState(false);
    //state for storing selected filters
    const [selectedFilters,setSelectedFilters] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(propertyAction.updateSearchParams(selectedFilters));
      dispatch(getAllProperties());
    }, [selectedFilters, dispatch]);
    
    //function to handle opening the modal/popupwindow
    const handleOpenModal =()=>{
        setIsModalOpen(true); // sets ismodalopen to true to open the modal
    };

    //function to handle closing the modal
    const handleCloseModal =()=>{
        setIsModalOpen(false); // sets ismodalopen to false to close the modal
    };  
    
    //function to handle changes in filters
    const handleFilterChange =(filterName, value)=>{
        //update the selected filters ewith the new values
        setSelectedFilters((prevFilters)=>({
          ...prevFilters,
          [filterName]: value,
        }));
    };

    return (
      <>
        {/* click event to open the modal */}
          <span class="material-symbols-outlined filter" onClick={handleOpenModal}>
            tune
          </span>
          {isModalOpen && (
              <FliterModal
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClose={handleCloseModal}
              />
          )}
      </>
    );
};

export default Filter;