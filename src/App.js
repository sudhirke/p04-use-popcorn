import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//seach box component on top header
function Search({ query, setQuery }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}

//Logo componenet presentational componenent
function Logo() {
  return (
    <>
      {" "}
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}

//Component to show search result
function ResutCount({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </>
  );
}

//Navigation bar control Structural component
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

//Common movie list componenet that displays movies list and watched list
function MovieList({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>

        {isOpen && children}
      </div>
    </>
  );
}

// //watch movie list pane
// function WatchList({ children }) {
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && children}
//       </div>
//     </>
//   );
// }

//Movies component
function Movies({ movies }) {
  return (
    <>
      {" "}
      <ul className="list">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}

//Each movie details
function Movie({ movie }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}

//Watch history summary
function WatchSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    </>
  );
}

//Watched movie list
function WatchedMovieHistory({ watched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    </>
  );
}

//render movies
function WatchedMovie({ movie }) {
  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </li>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

const APIKEY = "164cb801";

//Defines overall layout of the app
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const tempQuery = "Last";

  // https://www.omdbapi.com/?apikey=164cb801&s=star
  // Method to read data from api
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const result = await fetch(
            `https://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
          );

          //Error handling
          if (!result.ok)
            throw new Error("Somethign went wrong while fetching movies!");

          const data = await result.json();
          if (data.Response === "False") throw new Error("Movie not found!!");

          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  ); //uses dependency array

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <ResutCount movies={movies} />
      </NavBar>
      <Main>
        <MovieList>
          {/* {isLoading ? <Loader /> : <Movies movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <Movies movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </MovieList>

        <MovieList>
          <WatchSummary watched={watched} />
          <WatchedMovieHistory watched={watched} />
        </MovieList>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span>
      {message}
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
