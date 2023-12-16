import ListBox from "./ListBox";
import WatchedBox from "./WatchedList";
export default function Main({ tempMovieData, tempWatchedData, average, movies }) {
  return (
    <main className="main">
      <ListBox tempMovieData={tempMovieData} movies={movies} />
      <WatchedBox tempWatchedData={tempWatchedData} average={average} />
    </main>
  );
}
