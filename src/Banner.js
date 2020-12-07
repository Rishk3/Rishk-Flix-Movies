import React,{useState,useEffect} from 'react'
import axios from "./routes/axios"
import endPoints from './routes/request';
import "./css/banner.css"
function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
  
      async function fetchData() {
  
        const request = await axios.get(endPoints.fetchNetflixOriginals);
        setMovie(
          request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
        // Math.floor(Math.random() * request.data.results.length -1)
        return request;
      }
      fetchData();
    }, []);

   const truncate=(str, n)=> {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
        <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "top 25%"
      }}
    >
       
        <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <p className="banner_description">{truncate(movie?.overview, 200)}</p>
        {/* <p className="banner_description">{(movie?.overview)}</p> */}
      </div>

      <div className="banner--fadeBottom" />
     
 
    </header>
    )
}

export default Banner
