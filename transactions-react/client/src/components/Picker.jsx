import React from "react";

const Picker = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="picker">Choose value to aggregate:</label>
      <select
        id="picker"
        value={value}
        onChange={(e) => onChange(e.target.value)}>
        <option value="category">Category</option>
        <option value="amount">Amount</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};

export default Picker;
