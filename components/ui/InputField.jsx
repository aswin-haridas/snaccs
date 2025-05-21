export const InputField = ({
  type,
  placeholder,
  name,
  id,
  required,
  className,
  value, // Added from Controller's field
  onChange, // Added from Controller's field
  onBlur, // Added from Controller's field
  // ref is also passed by field, but input elements handle it directly
  // error, // Optional: if you want to pass error message directly
  ...rest // To capture other props like ref from field
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        required={required} // Can be kept or removed if RHF handles all validation
        className={`border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest} // Spreads ref and any other props
      />
      {/* Optional: Display error message here if passed as a prop */}
      {/* {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>} */}
    </>
  );
};
