
import './App.css';
import Row from "./Row"
import endPoints from "./routes/request"
import Banner from './Banner';
function App() {
  return (
    <div className="App">
    <Banner/>
      <Row title="NETFLIX ORIGINALS" isLargeRow={true} fetchUrl={endPoints.fetchNetflixOriginals} />
			<Row title="Trending" fetchUrl={endPoints.fetchTrending} />
			<Row title="Top Rated" fetchUrl={endPoints.fetchTopRated} />
			<Row title="Action Movies" fetchUrl={endPoints.fetchActionMovies} />
			<Row title="Comedy Movies" fetchUrl={endPoints.fetchComedyMovies} />
			<Row title="Horror Movies" fetchUrl={endPoints.fetchHorrorMovies} />
			<Row title="Romance Movies" fetchUrl={endPoints.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={endPoints.fetchDocumentaries} />
    </div>
  );
}

export default App;
