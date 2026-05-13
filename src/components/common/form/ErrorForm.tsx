type Props = React.HTMLAttributes<HTMLSpanElement> & {
  error: Error;
};

const ErrorForm = ({ error }: Props) => {
  return (
    <span className="font-body-primary text-error-500">{error.message}</span>
  );
};

export default ErrorForm;
