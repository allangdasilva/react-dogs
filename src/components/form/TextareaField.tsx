type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
};

const TextareaField = ({ id, ...props }: Props) => {
  return (
    <textarea
      className="w-full px-4 py-3 rounded-base resize-none border border-base-300 outline-0 text-base-700 bg-base-100 placeholder:text-base-300 hover:border-base-500 focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-base-000 transition-colors ease-in"
      id={id}
      {...props}
    ></textarea>
  );
};

export default TextareaField;
