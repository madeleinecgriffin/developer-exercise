import React from "react";
import "./SectionBox.css";

export const SectionBox = ({ children }) => {
  return (
    <div className="SectionBox">
        {children}
    </div>
  );
};

export default SectionBox;