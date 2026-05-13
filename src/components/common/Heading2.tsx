type Props = {
  children: React.ReactNode;
};

const Heading2 = ({ children }: Props) => {
  return (
    <h3 className="font-title-secondary wrap-break-word min-w-0 text-neutral-dogs-900">
      {children}
    </h3>
  );
};

export default Heading2;
