import React from "react";

const CheckBox = ({ value, checked, label, onChange }) => {
  return (
    <div className="flex">
      <div className="pr-2">
        <label>
          <input
            className="w-5.5 h-5.5 cursor-pointer 
            rounded-1xl border-2 border-[#D2D5DA] checked:border-none 
            accent-[#4E80EE] transition-all"
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange}
          />
        </label>
      </div>
      <div>
        <h3>{label}</h3>
      </div>
    </div>
  );
};

export default CheckBox;
