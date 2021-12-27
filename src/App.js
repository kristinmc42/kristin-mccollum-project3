// app displays a list of songs for the user based on their input of an artist name and their selection of number of songs 
// also displays a list of 5 similar artists
// includes links to the page on Last FM for the songs and the artists

import './App.css';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ArtistForm from './ArtistForm';


function App() {
  require('dotenv').config();
   // initialize state for intro section and artist form 
  const [showIntro, setShowIntro] = useState(true);
  const [showArtistForm, setShowArtistForm] = useState(false);

  // hides intro section and shows artist form when user clicks on start button in intro
  const handleClick = () => {
    setShowIntro(false);
    setShowArtistForm(true);
  }

  return (
    <>
      <Header />
      <main className="App">
        <div className='wrapper'>
          <section className="intro wrapper">
            {showIntro ?
            <>
              <h1>Song Selector</h1>
              <p>Tired of listening to the same songs by your favourite artists?</p>
              <p>Wondering what were some of the hits by that band that you remember from way back?</p>
              <p>Wish someone would pick some random songs for you?</p>
              <p>You've come to the right place!</p>
              <button onClick={handleClick} className="introButton">Let's get started!</button>
            </>
            : null
          }
          </section>

          <section className="partOne wrapper">
            {
              showArtistForm
              ?
              <>
                <h2>Let's find you some tunes! </h2>
                <ArtistForm />
              </>
              : null
            }
          </section> 
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default App;
