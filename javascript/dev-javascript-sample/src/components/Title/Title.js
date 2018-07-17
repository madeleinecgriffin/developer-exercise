import React from "react";
import "./Title.css";

export const Title = ({ children }) => {
  return (
    <div className="title">
      <h2>
        {children}
      </h2>
    </div>
  );
};

export default Title;