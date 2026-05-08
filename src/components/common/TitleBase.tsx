type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  children: string;
};

const TitleBase = ({ children }: Props) => {
  const words = children.split(" ");
  const firstWord = words[0];
  // pula a primeira palavra do array e junte o restante com um espaço
  const restOfTitle = words.slice(1).join(" ");

  return (
    <h2 className="relative font-title-base text-base-700 capitalize">
      <span className="relative after:absolute after:bottom-1 after:-left-1 after:w-4 after:h-4 after:bg-[url(/img/pegada.svg)] after:bg-center after:pointer-events-none">
        {firstWord}{" "}
      </span>
      {restOfTitle}
    </h2>
  );
};

export default TitleBase;
