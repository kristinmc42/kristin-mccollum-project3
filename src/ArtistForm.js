// this component will get the user text input
// save the input in state 

import { useState } from "react";
import DisplaySongs from "./DisplaySongs";
import axios from "axios";
import GetMoreSongs from "./GetMoreSongs";


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
    // console.log(event.target.value)
  }

  // update state when user selects a new option
  const handleUserChoice = (event) => {
    setUserChoice(event.target.value);
  }

  // when user submits form, hide the form, call API and show the song results
  const handleSubmit = ((event) => {
    event.preventDefault();

    // setUserInput(userInput);
    // setUserChoice(userChoice);
    
    // call API based on artist name 
    const apiKey = "55a0c662e159f9a95c530a23f4af3da8";
    const songResults = [];

    if (userInput !== ""){
      axios({
        url: "https://ws.audioscrobbler.com/2.0/",
        params: {
          format: "json",
          method: "artist.gettoptracks",
          api_key: apiKey,
          artist: userInput,
          autocorrect: [0 | 1]
        }
      })
      .then(response => {
        console.log(response)

        setShowErrorMessage(false);


        if (response.length !== 0 && response.data.toptracks.track.length > 1){
          // make a copy of the results and save it in a variable
          const allArtistsSongs = [...response.data.toptracks.track];
    
          // console.log(allArtistsSongs)
    
          let randomSong = {};
          
    
          // pick random songs from allArtistsSongs based on number selected by user
          // save each song in an object

          console.log(userChoice)

         
          for (let index = 1; index < 21; index++){
            const randomNumber = Math.floor(Math.random() * allArtistsSongs.length);
            randomSong = allArtistsSongs[randomNumber];
            
            // add artist as property of randonSong
            randomSong.artist=userInput;
            // save the objects in a new array
            songResults.push(randomSong);

            //remove song from allartistsSongs
            allArtistsSongs.splice(randomNumber, 1);
          }
          setNewSongList(songResults);

          // show songs & reset button; hide form
          setShowSongResults(true);
          setShowForm(false);
          setShowResetButton(true);

        }
      })
      .catch(() => {
        setShowErrorMessage(true);
        setUserInput("");
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
          <GetMoreSongs artist={userInput}/>
          
          </>)
        : null
      }
      {
        showForm
        ?
        <form onSubmit={handleSubmit}>
          <label htmlFor="artistChoice">Choose an artist</label>
          <input 
            type="text" 
            id="artistChoice" 
            value={userInput} 
            onChange={handleChange}
            placeholder="Taylor Swift, Coldplay, Doja Cat, BTS, Lil Nas X..."
          />
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
            <option value={Math.ceil(Math.random() * 20)}>Surprise me!</option>
          </select>
          <button>Submit</button>
        </form>
        : null
      }
      {
        showErrorMessage
        ? <p className="errorMessage">Hmm...We didn't find any results for that. Please try again</p>
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