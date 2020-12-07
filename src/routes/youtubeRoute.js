import axios from 'axios';
const YOUTUBE_API_KEY=process.env.REACT_APP_MY_YOUTUBE_API_KEY
const instance = axios.create({
	baseURL: `https://youtube.googleapis.com/youtube/v3/search?maxResults=1&order=viewCount&type=video&videoDuration=short&key=${YOUTUBE_API_KEY}&q=`
});

export default instance;