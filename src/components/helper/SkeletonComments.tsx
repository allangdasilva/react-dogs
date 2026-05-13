const SkeletonComments = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      {Array.from({ length: 14 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-1 *:flex-1 *:h-4.5 *:rounded-base *:animate-pulse *:bg-neutral-dogs-200"
        >
          <div className="max-w-6"></div>
          <div></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComments;
