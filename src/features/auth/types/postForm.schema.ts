import z from "zod/v3";

export const postFormSchema = z.object({
  nome: z.string().min(1, "Preencha um valor.").max(32, "Nome muito grande."),
  peso: z.coerce.number().positive("Insira um peso válido."),
  idade: z.coerce.number().positive("Insira uma idade válida."),
  img: z
    .any()
    .refine((files) => files?.length > 0, "A foto é obrigatória.")
    .refine(
      (files) => files?.[0]?.size <= 5000000,
      "A imagem deve ter no máximo 5MB.",
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Formato inválido. Use JPG, PNG ou WebP.",
    ),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;
