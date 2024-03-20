export default function Button({ children, textOnly, className, ...props }) {
  const buttonClasses = textOnly
    ? "text-button"
    : "button" + (className ? ` ${className}` : "");

  return (
    <>
      <button className={buttonClasses} {...props}>
        {children}
      </button>
    </>
  );
}
