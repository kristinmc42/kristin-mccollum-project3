// this component will get the user text input
// save the input in state 

import { useState, useEffect } from "react";
import DisplaySongs from "./DisplaySongs";
import axios from "axios";


function ArtistForm(){
  // initialize useState for user input
  const [userInput, setUserInput] = useState("");

  // create a new state piece for the song list
  const [newSongList, setNewSongList] = useState([]);

  // initialize useStates for displaying form and results
  const [showArtistForm, setShowArtistForm] = useState(true);
  const [showSongResults, setShowSongResults] = useState(false);

  // when user types something in the input field
  const handleChange = (event) => {
    // update userInput state with the input value
    setUserInput(event.target.value);
    console.log(event.target.value)
  }

  // when user submits form, hide the form and show the song results
  const handleSubmit = ((event) => {
    event.preventDefault();
    setShowArtistForm(false);
    setShowSongResults(true);
  })


  // call the API when the state of userInput changes
  useEffect(() => {

    // call API based on artist name 
    const apiKey = "55a0c662e159f9a95c530a23f4af3da8";
    console.log("in useEffect for API call")

    if (userInput !== null){
      axios({
        url: "http://ws.audioscrobbler.com/2.0/",
        params: {
          format: "json",
          method: "artist.gettoptracks",
          api_key: apiKey,
          artist: userInput,
          autocorrect: [0 | 1]
        }
      })
      .then(response => {
        if (response.length !== 0){
          // make a copy of the results and save it in a variable
          const allArtistsSongs = [...response.data.toptracks.track];
    
          console.log(allArtistsSongs)
    
          let randomSong = {};
          const songResults = [];
    
          // pick 3 random songs from allArtistsSongs
          // save each song in an object
          for (let index=1; index<4; index++){
            randomSong = allArtistsSongs[Math.floor(Math.random() * allArtistsSongs.length)];
            
            // add artist as property of randonSong
            randomSong.artist=userInput;
            // save the objects in a new array
            songResults.push(randomSong);
          }
          setNewSongList(songResults);
        }
      });
    }
  }, [userInput])

  return(
    <>
    {
      showArtistForm 
      ?  <form onSubmit={handleSubmit}>
          <label htmlFor="artistChoice">Choose an artist</label>
          <input 
            type="text" 
            id="artistChoice" 
            value={userInput} 
            onChange={handleChange}
            placeholder="Taylor Swift, Coldplay, Doja Cat, BTS, Lil Nas X..."
          />
          <button>Submit</button>
        </form>
      : null
    }
    {
      showSongResults
      ? <DisplaySongs props={newSongList}/>
      : null
    }
    </>
  )
}

export default ArtistForm;