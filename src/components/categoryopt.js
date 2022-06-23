import React from "react";

const Categoryopt = ({ handleCategory, options }) => {
  return (
    <div>
      <h4>Category</h4>
      <div>
        {options.map((item, index) => (
          <button
            onClick={() => {
              handleCategory(item);
            }}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categoryopt;
