

import './App.css';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from "axios";




function App() {
   // hides intro section 
  const [showIntro, setShowIntro] = useState(true);
  const [showPartOne, setShowPartOne] = useState(false);

  // initialize useState for user input
  const [userInput, setUserInput] = useState("");

  // for when user clicks on start button
  const handleClick = () => {
    setShowIntro(false);
    setShowPartOne(true);
  }

  // when user types something in the input field
  const handleChange = (event) => {
    // update userInput state with the input value
    setUserInput(event.target.value);
    console.log(event.target.value)
  }

  // when user submits artist name
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value, userInput)
  

    // call API based on artist name 
    const apiKey = "55a0c662e159f9a95c530a23f4af3da8";
    // const sharedSecret = "5653c82e28f07d2107a042a3d733d57f";
    console.log("in CallApi")

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
      // 
      console.log(response.data.toptracks.track[0].name, response.data.toptracks.track)  
    
      const allArtistsSongs = [...response.data.toptracks.track];
      console.log(allArtistsSongs)


      // pick 3 random songs from allArtistsSongs
      let randomSong = {};
      const songResults = [];
      for (let index=1; index<4; index++){
        randomSong = allArtistsSongs[Math.floor(Math.random() * allArtistsSongs.length)];
        // console.log(randomSong)
        // setRandomSongs(randomSong);
        songResults.push(randomSong);
      }
      
      console.log(`These are 3 random songs: ${songResults[0].name} ${songResults[1].name} ${songResults[2].name}`)

      // 🚨 The data displayed in these console logs is what I need to display on the page
      console.log(`1st song - name: ${songResults[0].name}, artist: ${userInput}, key: ${songResults[0].mbid}, url: ${songResults[0].url}`)
      console.log(`2nd song - name: ${songResults[1].name}, artist: ${userInput}, key: ${songResults[1].mbid}, url: ${songResults[1].url}`)
      console.log(`3rd song - name: ${songResults[2].name}, artist: ${userInput}, key: ${songResults[2].mbid}, url: ${songResults[2].url}`)
    })
  } // end of handleSubmit

  

  return (
    <>
    <Header />
    <main className="App">
      <section className="intro wrapper">
        {showIntro ?
        <>
          <h1>Soundtrack your day</h1>
          <p>Haven't you ever wondered what your day would be like if there was a soundtrack for everything you did.</p>
          <p>Well now you can have one!</p>
          <button onClick={handleClick}>Let's get started!</button>
        </>
        : null
        }
      </section>
      <section className="partOne wrapper">
        {
          showPartOne
          ?
          <>
            <h2>Let's get your morning going! </h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="artistChoice">Who is your musical inspiration today?</label>
              <input 
                type="text" 
                id="artistChoice" 
                value={userInput} 
                onChange={handleChange}
                placeholder="Taylor Swift, Coldplay, Doja Cat, BTS, Lil Nas X..."
              />
              <button>Submit</button>
            </form>
          </>
          : null
        }
      </section>
     
      <ul className="wrapper">
     
      </ul>
    </main>
    <Footer/>
    </>
  );
}

export default App;
