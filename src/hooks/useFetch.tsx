import { useEffect, useState } from "react";

export function useFetch<Type>(
  url: string,
  parser: Function
): [Type[], boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, setState] = useState<Type[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const parsedData = parser(data);

        setState(parsedData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  return [state, isLoading];
}
