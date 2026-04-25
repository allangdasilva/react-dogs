import Modal from "./modal/Modal";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { photosInfiniteQueryOptions } from "../../features/auth/api/queries/photos.infiniteQuery";
import Loading from "../helper/Loading";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLElement> & {
  userId: number;
  isProfile: boolean;
};

const Feed = ({ userId, isProfile }: Props) => {
  const { ref } = useInView({
    threshold: 0,
    rootMargin: "100px",
    // onChange: Este callback só é chamado quando o valor de inView muda (de false para true ou vice-versa).
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  // data: contém o pageParams (valor/número da página) e pages (array das páginas)
  // fetchNextPage: é uma função que dispara a busca da próxima página. (Ela parece um mutate só no sentido de ser uma ação que você chama manualmente, mas ela continua sendo uma query, não uma mutation (não muda os dados).)
  // hasNextPage: verifica se tem mais páginas para buscar
  // isFetchingNextPage: verifica se a requisição da próxima página está ocorrendo
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(photosInfiniteQueryOptions(userId));

  // pages é um array de páginas. ex: ([página 1 (com 6 fotos)], [página 2 (com 6 fotos)]...)
  // Como o Feed espera uma lista única, eu junto tudo com flat().
  const photos = data.pages.flat();

  return (
    <section className="w-full flex flex-col max-w-base px-4 py-12">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {photos.map((photo) => (
          <li
            className={clsx(
              "relative grid rounded-base aspect-square overflow-hidden  transition-colors ease-in has-focus-visible:outline-2 outline-base-900",
              {
                "md:nth-2:col-start-2 md:nth-2:col-end-4 md:nth-2:row-span-2":
                  !isProfile,
              },
            )}
            key={photo.id}
          >
            <Modal photo={photo} />
          </li>
        ))}
      </ul>

      <div ref={ref} aria-hidden={true}></div>

      {isFetchingNextPage && <Loading />}

      {!hasNextPage && !isProfile ? (
        <p className="font-body-base text-base-500 text-center mt-12">
          Isso é tudo por enquanto.
        </p>
      ) : null}
    </section>
  );
};

export default Feed;
