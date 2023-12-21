import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function SelecetdMovie({ selectedId, onCloseMovie, getQuery, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const { Title: title, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;
  function addBtnHandler() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
  }

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
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxStarts={10} size={24} onSetRating={setUserRating} />
              {userRating > 0 ? (
                <button className="btn-add" onClick={addBtnHandler}>
                  + Add To List
                </button>
              ) : null}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed By {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
