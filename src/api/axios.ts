import axios from "axios";

// configura a base URL da API. Centralizar aqui permite que, caso o domínio
// mude, a alteração precise ser feita em apenas um único arquivo.
export const api = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json",
});
