import axios from 'axios';
const YOUTUBE_API_KEY="AIzaSyBLr2XrslwMdMa-JAJ0JbV27Cz7Fv_FZXY"
const instance = axios.create({
	baseURL: `https://youtube.googleapis.com/youtube/v3/search?maxResults=1&order=viewCount&type=video&videoDuration=short&key=${YOUTUBE_API_KEY}&q=`
});

export default instance;