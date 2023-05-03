import React from "react";

const Button = (props) => {
  let { title, onClick, type } = props;
  if (title == "Delete") {
    // Add css styling to delete button
    type = type + " deleteButton";
  } else if (title == "Edit") {
    // Add css styling to edit button
    type = type + " editButton";
  }
  return (
    <button className={type} title={title} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
