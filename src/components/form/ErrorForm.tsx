import React from "react";

type ErrorProps = React.HTMLAttributes<HTMLSpanElement> & {
  error: Error;
};

const ErrorForm = ({ error, ...props }: ErrorProps) => {
  return (
    <span {...props} className="font-body-sm text-error">
      {error.message}
    </span>
  );
};

export default ErrorForm;
