import React,{useState,useEffect} from 'react'
import axios from "./routes/axios"
import "./css/row.css"
import YouTube from 'react-youtube';

import youtubeRoute from "./routes/youtubeRoute";

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
    // console.log("movie name",movie); 
    setDisplay("hide")
  let queryString="";
    if(movie.name==null){ queryString=movie.original_title +" official trailer"; }
    if(movie.original_title==null){ queryString+=movie.name +" official trailer" ;}
    console.log("Searching for from api==>",queryString);
    
youtubeRoute.get(queryString)
            .then((response)=>{
              console.log("youtube response",response.data.items[0].id.videoId);
              setTrailerUrl(response.data.items[0].id.videoId)
            },(error)=>{
              setError(true) 
              setDisplay("")
              console.log("Error kyu",error);
            })
  }
  const renderAfterClick = ()=>{
    if(trailerUrl){
      return <YouTube  videoId={trailerUrl} opts={opts}  />
    }if(error){
      return <p className={`row__trailer__error ${display}`}> Today's Youtube Api QUota expired</p>
    }
  }

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
