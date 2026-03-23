type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

const InputField = ({ id, label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col font-body-base text-base-700">
      <label className="pb-2 cursor-pointer" htmlFor={id}>
        {label}
      </label>
      <input
        className="w-full px-4 py-3 rounded-base border border-base-300 outline-0 bg-base-100 placeholder:text-base-300 hover:border-base-500 focus:border-primary focus:ring-2 focus:ring-primary/40 transition-colors ease-in"
        id={id}
        {...props}
      />
    </div>
  );
};

export default InputField;
