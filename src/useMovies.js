import { useState, useEffect } from "react";
const APIKEY = "164cb801";
//custom hook
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // https://www.omdbapi.com/?apikey=164cb801&s=star
  // Method to read data from api
  useEffect(
    function () {
      //optional chaining to callback
      //callback?.();

      //declare abort controller
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const result = await fetch(
            `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
            { signal: controller.signal }
          );

          //Error handling
          if (!result.ok)
            throw new Error("Somethign went wrong while fetching movies!");

          const data = await result.json();
          if (data.Response === "False") throw new Error("Movie not found!!");

          setMovies(data.Search);

          setIsLoading(false);

          setError("");
        } catch (err) {
          console.log(err);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //handleCloseMovie();
      fetchMovies();

      //cleanup function for this effect
      return function () {
        //abort the request using controller
        controller.abort();
      };
    },
    [query]
  ); //uses dependency array

  return { movies, isLoading, error };
}
