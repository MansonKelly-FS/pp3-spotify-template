import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { accessToken, logout, searchArtist } from "./services/spotify";
import { PiSpotifyLogo, PiHouse, PiSignOut } from "react-icons/pi";
import Searchbar from "./components/Searchbar";
import Card from "./components/Card";

function App() {
  const [token, setToken] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("Search button clicked", event.target.search.value);
    const response = await searchArtist(event.target.search.value);
    console.log("from spotify", response);
    setAlbums(response.albums);
    setTopTracks(response.topTracks); 
    setRelatedArtists(response.relatedArtists);
  };

  return (
    <main className="wrapper">
      <nav>
        <span className="logo">
          <PiSpotifyLogo />
        </span>
        <Searchbar onSubmit={handleSearch} />
        <span className="navIcons">
          <a href="/">
            <PiHouse />
          </a>
          <a href="/logout" onClick={logout}>
            <PiSignOut />
          </a>
        </span>
      </nav>
      <section>
        <>
          {!token ? (
            <a href="http://localhost:3001/api/v1/auth">Login to Spotify</a>
          ) : (
            <>
              <div className="noResults">
                <h2>Search for an artist to get started</h2>
              </div>
              <div>
                <h3>Top Tracks</h3>
                {topTracks.length > 0 && (
                  <div className="cards">
                    {topTracks.map((topTrack) => (
                      <Card
                        key={topTrack.id}
                        img={topTrack.album.images[0].url}
                        link={topTrack.href}
                        name={topTrack.name}
                      />
                    ))}
                  </div>
                )}
                <h3>Albums</h3>
                {albums.length > 0 && (
                  <div className="cards">
                    {albums.map((album) => (
                      <Card
                        key={album.id}
                        img={album.images[0].url}
                        link={album.href}
                        name={album.name}
                        metadata={album.release_date}
                      />
                    ))}
                  </div>
                )}
                <h3>Related Artists</h3>
                {relatedArtists.length > 0 && (
                  <div className="cards">
                    {relatedArtists.map((relatedArtist) => (
                      <Card
                        key={relatedArtist.id}
                        img={relatedArtist.images[0].url}
                        link={relatedArtist.href}
                        name={relatedArtist.name}
                        metadata={relatedArtist.genres[0]}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      </section>
    </main>
  );
}

export default App;
