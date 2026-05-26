import React from "react";

const Input = React.forwardRef(
  ({ type = "text", placeholder, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        {...rest}
        className="w-full px-4 py-2 border-2 border-deep-lavender-200 bg-soft-lavender-100 text-deep-lavender-500 outline-none focus:border-deep-lavender-400"
      />
    );
  }
);

export default Input;