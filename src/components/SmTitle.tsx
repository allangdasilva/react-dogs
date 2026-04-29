type Props = {
  children: React.ReactNode;
};

const SmTitle = ({ children }: Props) => {
  return (
    <h3 className="font-title-sm wrap-break-word min-w-0 text-base-700">
      {children}
    </h3>
  );
};

export default SmTitle;
