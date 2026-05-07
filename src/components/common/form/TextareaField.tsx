type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
};

const TextareaField = ({ id, label, ...props }: Props) => {
  return (
    <div className="w-full">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="w-full px-4 py-3 rounded-base resize-none input-interactive text-base-700 placeholder:text-base-300 transition-colors-ease-in"
        id={id}
        {...props}
      ></textarea>
    </div>
  );
};

export default TextareaField;
