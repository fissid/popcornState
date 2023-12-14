import ListBox from "./ListBox";
import WatchedBox from "./WatchedList";
export default function Main({ tempMovieData, tempWatchedData, average }) {
  return (
    <main className="main">
      <ListBox tempMovieData={tempMovieData} />
      <WatchedBox tempWatchedData={tempWatchedData} average={average} />
    </main>
  );
}
