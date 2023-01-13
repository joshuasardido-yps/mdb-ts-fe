export type TOptions = {
  method: string;
  url: string;
  params: {
    page: number | undefined;
    limit: number | undefined;
  };
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
  };
};
