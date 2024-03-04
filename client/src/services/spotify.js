import axios from "axios";

const getAccessToken = () => {
    // get from query params 
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access_token"); 
    const refreshToken = urlParams.get('refresh_token'); 

    // if there is an access token in local storage 
    const storedAccessToken = window.localStorage.getItem('access_token'); 
    if (storedAccessToken) {
        return storedAccessToken; 
    }

   // if there is a token in the query params, store in local storage
    if (accessToken && refreshToken) {
        window.localStorage.setItem("access_token", accessToken);
        window.localStorage.setItem("refresh_token", refreshToken);
        return accessToken; 
    }

    return false; 
}

export const logout = async () => { 
    window.localStorage.removeItem('access_token'); 
    window.localStorage.removeItem('refresh_token');

    await axios.get(`http://localhost:3001/api/v1/auth/logout`); 
    window.location = window.location.origin; 
}

export const accessToken = getAccessToken(); 

axios.defaults.baseURL = 'https://api.spotify.com/v1'; 
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`; 
axios.defaults.headers["Content-Type"] = 'application/json'; 

export const searchArtist = async (searchTerm) => {
    const artist = await axios.get(`/search?q=${searchTerm}&type=artist`); 
    const artistId = artist.data.artists.items[0].id;
    const albums = await axios.get(
      `/artists/${artistId}/albums?include_groups=album%2Csingle&market=US&offset=0`
    );
    console.log("albums", albums.data.items);
    const topTracks = await axios.get(
      `/artists/${artistId}/top-tracks`
    );

    const relatedArtists = await axios.get(
      `/artists/${artistId}/related-artists`
    );
    const results = {
        albums: albums.data.items, 
        topTracks: topTracks.data.tracks, 
        relatedArtists: relatedArtists.data.artists, 
    }
    return results; 
}