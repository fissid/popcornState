import { useState, useEffect } from "react";

export function useMovie(getQuery, selectedId) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getMovieById() {
        setIsLoading(true);
        const res = await fetch(getQuery(`i=${selectedId}`));
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieById();
    },
    [selectedId, getQuery]
  );
  return { movie, isLoading };
}
