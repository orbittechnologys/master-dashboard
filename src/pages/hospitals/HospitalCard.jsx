import React from "react";
// Main Card wrapper
function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
// Card Header section
function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
// Card Title
function CardTitle({ className = "", children, ...props }) {
  return (
    <h3
      className={`text-lg font-semibold text-gray-800 leading-none ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}
// Card Description
function CardDescription({ className = "", children, ...props }) {
  return (
    <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}
// Card Content section
function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-4 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
// Card Footer section
function CardFooter({ className = "", children, ...props }) {
  return (
    <div className={`p-4 pt-0 flex items-center gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
