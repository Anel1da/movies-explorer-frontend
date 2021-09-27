import React from "react";
import "./InfoTooltip.css";

export const InfoTooltip = ({ isOpen, onClose, infoToolTipMessage }) => {
  return (
    <div className={`tooltip  ${isOpen && "tooltip_opened"}`}>
      <div className="tooltip__container">
        <img className="tooltip__icon" src={infoToolTipMessage.icon} alt="#" />
        <h2 className="tooltip__title">{infoToolTipMessage.message}</h2>
        <button
          className="tooltip__close-button"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};
