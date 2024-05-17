import { ComponentPropsWithoutRef, type ReactNode } from "react";

type ButtonProps = {
  textOnly?: boolean;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  children,
  textOnly,
  className,
  ...props
}: ButtonProps) {
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
