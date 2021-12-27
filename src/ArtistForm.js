// this component will get the user text input
// save the input in state 

import { useState } from "react";
import DisplaySongs from "./DisplaySongs";
import axios from "axios";
import GetSimilarArtists from "./GetSimilarArtists";


function ArtistForm(){
  // initialize useState for user input
  const [userInput, setUserInput] = useState("");

  // initialize state for user select choice
  const [userChoice, setUserChoice] = useState("placeholder");

  // create a new state piece for the song list
  const [newSongList, setNewSongList] = useState([]);

  // initialize useStates for displaying form and results
  const [showSongResults, setShowSongResults] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
 

  // update state when user types something in the input field
  const handleChange = (event) => {
    // update userInput state with the input value
    setUserInput(event.target.value);
  }

  // update state when user selects a new option
  const handleUserChoice = (event) => {
    setUserChoice(event.target.value);
  }

  // when user submits form, hide the form, call API and show the song results
  const handleSubmit = ((event) => {
    event.preventDefault();

    // call API based on artist name 
   
    const songResults = [];

    if (userInput !== ""){
      axios({
        url: "https://ws.audioscrobbler.com/2.0/",
        params: {
          format: "json",
          method: "artist.gettoptracks",
          api_key: `${process.env.REACT_APP_API_KEY}`,
          artist: userInput,
          autocorrect: [0 | 1]
        }
      })
      .then(response => {
        // clears error message if still displayed
        setShowErrorMessage(false);

        if (response.length !== 0 && response.data.toptracks.track.length > 1){
          // make a copy of the results and save it in a variable
          const allArtistsSongs = [...response.data.toptracks.track];
          
          let randomSong = {};
          
          for (let index = 1; index < 21; index++){
            // pick random song from allArtistsSongs 
            const randomNumber = Math.floor(Math.random() * allArtistsSongs.length);

            // save song in an object
            randomSong = allArtistsSongs[randomNumber];
            
            // add artist as property of randonSong
            randomSong.artist=userInput;

            // save the object in a new array
            songResults.push(randomSong);

            //remove song from allartistsSongs
            allArtistsSongs.splice(randomNumber, 1);
          }
          // update state with the song results array
          setNewSongList(songResults);

          // show song results & the reset button; hide input form
          setShowSongResults(true);
          setShowForm(false);
          setShowResetButton(true);

        }
      })
      .catch(() => {
        // error handling displays error message and resets values of state in form
        setShowErrorMessage(true);
        setUserInput("");
        setUserChoice("placeholder");
      });
    }
  })

  const handleReset = (event) => {
    event.preventDefault();
    // update userInput state with an empty string
    setUserInput("");

    // update userChoice to placeholder
    setUserChoice("placeholder");

    // hide reset button, songresults, error message and show input form
    setShowSongResults(false);
    setShowForm(true);
    setShowErrorMessage(false);
    setShowResetButton(false);
  }

  return(
    <>
      {
        showSongResults

        ? (
          <>
          <h3>Here are some songs from <span className="capitalize">{userInput}</span></h3>
          <p>Click on the song name to visit the Last FM page for that song</p>
          <DisplaySongs songs={newSongList} number={userChoice}/>
          <GetSimilarArtists artist={userInput}/>
          
          </>)

        : null
      }
      {
        showForm

        ?
        <form onSubmit={handleSubmit}>
          <fieldset>
          <label htmlFor="artistChoice">Search for an artist:</label>
          <input 
            type="text" 
            id="artistChoice" 
            className="artistChoice"
            value={userInput} 
            onChange={handleChange}
            placeholder="e.g. Taylor Swift, Coldplay, Doja Cat, Lil Nas X..."
          />
          </fieldset>
          <fieldset>
            <label htmlFor="numOfSongs">How many songs would you like?</label>
            <select 
              name="numOfSongs" 
              id="numOfSongs" 
              onChange={handleUserChoice} 
              value={userChoice}
            >
              <option value="placeholder" disabled>Pick one:</option>
              <option value="5">Five</option>
              <option value="10">Ten</option>
              <option value="20">Twenty</option>
              <option value={Math.ceil(Math.random() * 20)} aria-label="picks a random number between 1 and 20">Surprise me!</option>
            </select>
          </fieldset>
          <button>Submit</button>
        </form>

        : null
      }
      {
        showErrorMessage

        ? 
        <>
        <p className="errorMessage">Hmm...We didn't find any results for that. </p>
        <p className="errorMessage">Please try again.</p>
        </>
        : null
      }
      {
        showResetButton

        ?
          <button onClick={handleReset} className="reset">Reset - Let's try again!</button>

        : null
      }
    </>
  )
}

export default ArtistForm;