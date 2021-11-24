

import './App.css';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ArtistForm from './ArtistForm';




function App() {
   // hides intro section 
  const [showIntro, setShowIntro] = useState(true);
  const [showPartOne, setShowPartOne] = useState(false);

  // for when user clicks on start button
  const handleClick = () => {
    setShowIntro(false);
    setShowPartOne(true);
  }

  return (
    <>
    <Header />
    <main className="App">
      <section className="intro wrapper">
        {showIntro ?
        <>
          <h1>Playlist Proliferation</h1>
          <p>Tired of listening to the same songs by your favourite artists?</p>
          <p>Wish someone would pick some random songs for you?</p>
          <p>You've come to the right place!</p>
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
            <h2>Let's find you some tunes! </h2>
            <ArtistForm />
          </>
          : null
        }
      </section>
    </main>
    <Footer/>
    </>
  );
}

export default App;
