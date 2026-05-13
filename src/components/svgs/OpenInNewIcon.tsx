const OpenInNewIcon = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="*:transition-colors-no-outline group-hover:*:stroke-primary-500 group-focus-visible:*:stroke-primary-500"
    >
      <title>Ir para o post</title>
      <path
        d="M11 4H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V13"
        stroke="var(--color-neutral-dogs-900)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 15L20 4"
        stroke="var(--color-neutral-dogs-900)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 4H20V9"
        stroke="var(--color-neutral-dogs-900)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OpenInNewIcon;
