import { useState, useEffect } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

function ScalableMarker(props) {
  const { position, tooltipText, handleClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleMouseOver = () => {
    setIsOpen(true);
  };

  const handleMouseOut = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Marker
        position={position}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      />
      {/* {isOpen && (
        <InfoWindow
          onClick={handleClick}
          position={position}
          onCloseClick={handleMouseOut}
        >
          <div style={{ color: "black" }}>{tooltipText}</div>
        </InfoWindow>
      )} */}
    </>
  );
}
export default ScalableMarker;
