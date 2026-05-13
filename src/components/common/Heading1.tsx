type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string;
};

const Heading1 = ({ children }: Props) => {
  const words = children.split(" ");
  const firstWord = words[0];
  // pula a primeira palavra do array e junte o restante com um espaço
  const restOfTitle = words.slice(1).join(" ");

  return (
    <h1 className="font-title-primary text-neutral-dogs-900 capitalize">
      <span className="relative pointer-events-none after:absolute after:w-6 after:h-6 after:bg-[url(/img/foot.svg)] after:rotate-45 after:-left-2.5 after:-bottom-1 after:bg-center">
        {firstWord}{" "}
      </span>
      {restOfTitle}
    </h1>
  );
};

export default Heading1;
