import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // se a imagem já estiver no cache do navegador, às vezes o evento onLoad dispara antes do React terminar de montar o componente ou hidratar. O resultado? O skeleton pode ficar "preso" ou a imagem aparecer com um atraso desnecessário.
  useEffect(() => {
    // Se a imagem já estiver no cache quando o componente montar
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="w-full h-full flex-1">
      {!loaded && (
        <div className="w-full h-full animate-pulse bg-base-200"></div>
      )}
      <img
        ref={imgRef}
        {...props}
        // O decoding="async" faz com que o navegador processe a imagem em segundo plano. Isso impede que a página "trave" ou fique lenta durante o carregamento, mantendo a rolagem e a interface fluidas enquanto a imagem é decodificada.
        decoding="async"
        // Só baixa a imagem quando ela estiver perto do scroll.
        loading="lazy"
        className={clsx(
          "w-full h-full object-cover opacity-0 transition-opacity ease-in",
          {
            "opacity-100": loaded,
          },
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default Image;
