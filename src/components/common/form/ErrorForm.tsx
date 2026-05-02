type Props = React.HTMLAttributes<HTMLSpanElement> & {
  error: Error;
};

const ErrorForm = ({ error }: Props) => {
  return <span className="font-body-sm text-error">{error.message}</span>;
};

export default ErrorForm;
