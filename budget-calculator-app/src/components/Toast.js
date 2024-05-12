import React from "react";

const Toast = React.memo(({ message, color }) => {
  // console.log("🚀 ~ Toast");
  return (
    <div
      className={`bg-${color}-400 p-1 text-white rounded shadow-md text-center mb-5`}
    >
      <span>{message}</span>
    </div>
  );
});

export default Toast;
