import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useMovie } from "./useMovie";

export default function SelecetdMovie({ selectedId, onCloseMovie, getQuery, onAddWatched, watched }) {
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const { isLoading, movie } = useMovie(getQuery, selectedId);

  const isWatched = watched.map((each) => each.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((each) => each.imdbID === selectedId)?.userRating;

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  function addBtnHandler() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      userDecisionCount: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    console.log(newWatchedMovie.userDecisionCount);
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title} | ${year}`;

      return function () {
        document.title = "popcornState";
        // console.log(`before re-render ${title} movie`);
      };
    },
    [title, year]
  );

  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onCloseMovie]
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
              {!isWatched ? (
                <>
                  <StarRating maxStarts={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 ? (
                    <button className="btn-add" onClick={addBtnHandler}>
                      + Add To List
                    </button>
                  ) : null}
                </>
              ) : (
                <p>
                  This movie has been added with {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
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
