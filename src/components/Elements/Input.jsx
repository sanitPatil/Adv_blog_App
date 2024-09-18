import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full p-1">
      {label && (
        <label className="font-bold  " htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`${className} p-2 m-1 border w-full hover:border-purple-700 drop-shadow-md `}
        {...props}
        id={id}
        ref={ref}
      ></input>
    </div>
  );
});

export default Input;
