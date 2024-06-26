import React, {useState} from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import {Spotify} from "../../util/Spotify/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      name: "example name 1",
      artist: "example artist 1",
      album: "example album 1",
      id: 1,
    },
    {
      name: "example name 2",
      artist: "example artist 2",
      album: "example album 2",
      id: 2,
    }
  ]);

  const [playlistName, setPlaylistName] = useState("Example playlist name");

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "example Playlist name 1",
      artist: "example Playlist artist 1",
      album: "example Playlist album 1",
      id: 1,
    },
    {
      name: "example Playlist name 2",
      artist: "example Playlist artist 2",
      album: "example Playlist album 2",
      id: 2,
    }
  ]);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if(existingTrack) {
      console.log("Track already exists");
    } else {
      setPlaylistTracks(newTrack);
    }
  }

  function removeTrack(track){
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  }

  function updatePlaylistName(name){
    setPlaylistName(name);
  }

  function savePlaylist(){
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    })
  }

  function search(term){
    Spotify.search(term).then((results) => setSearchResults(results));
    console.log(term);
  }

    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <div className={styles.App}>
          <SearchBar onSearch={search} />
          <div className={styles["App-playlist"]}>
          <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
          <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          />
          </div>
        </div>
      </div>
        );
}

export default App;
