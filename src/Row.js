import React,{useState,useEffect} from 'react'
import axios from "./routes/axios"
import "./css/row.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original"
function Row({title,fetchUrl,isLargeRow}) {
    const [movies,SetMovies]=useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [error,setError] =useState(false);
    const[display,setDisplay]=useState("")
 useEffect(() => {
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        SetMovies(request.data.results);
      }
      fetchData();
     
 }, [fetchUrl])
 const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  const handleClick = (movie) => {  
      setDisplay("")
  console.log(movie.name);
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        console.log("actual url",url)
        }).catch((error) => {console.log("im error",error);
        setError(true)
        setTimeout(()=>{ //hide message after 5 s
        setDisplay("hide")}, 3000);
    });
    }
  }
  const renderAfterClick = ()=>{
    if(trailerUrl){
      return <YouTube  videoId={trailerUrl} opts={opts}  />
    }if(error){
      return <p className={`row__trailer__error ${display}`}> Movie-trailer Npm Package cannot find Any trailer regarding your movie</p>
    }
  }
console.log("trailerUrl",trailerUrl)
    return (
        <div className="row">
          <h2>{title}</h2>
             <div className="row_posters">
            
        {movies.map(movie => {
          return <img
            key={movie.id}
               onClick={() => handleClick(movie)}
               className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
        })}
      </div>

      <div style={{ padding: "40px" }}>
        { renderAfterClick()}
      </div>

        </div>
    )
}

export default Row
