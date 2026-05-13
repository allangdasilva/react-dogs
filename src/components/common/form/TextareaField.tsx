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
        className="w-full px-4 py-3 rounded-base resize-none input-interactive text-neutral-dogs-900/90 placeholder:text-neutral-dogs-900/30 transition-colors-no-outline"
        id={id}
        {...props}
      ></textarea>
    </div>
  );
};

export default TextareaField;
