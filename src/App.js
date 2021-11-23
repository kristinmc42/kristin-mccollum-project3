

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
            <ArtistForm />
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
