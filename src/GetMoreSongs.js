// takes userInput as a prop
// makes an API call to get similar artist to userInput
// selects 5 random artist from results
// makes an API call for each of those artists to get one track from each
// returns an array with those 5 songs

import axios from "axios";
import { useState, useEffect } from "react";


function GetMoreSongs({artist}){
  const apiKey = "55a0c662e159f9a95c530a23f4af3da8";

  // initialize state for similar artist array
  const [similarArtists, setSimilarArtists] = useState([]);
  
  useEffect(() => {
      // call API based on artist name from user input     
      axios({
        url: "https://ws.audioscrobbler.com/2.0/",
        params: {
          format: "json",
          method: "artist.getsimilar",
          api_key: apiKey,
          artist,
          autocorrect: [0 | 1]
        }
      })
      .then(response => {
        if (response.length !== 0){
          // make a copy of the results and save it in a variable
          const returnedListOfArtists = [...response.data.similarartists.artist];

          // initailize empty array that will store random artist objects
          const randomArtistArray =[];
       
          // use for loop to pick 5 random artists from similar Artists array
          // save each artist in an object
          for (let index = 1; index < 6; index++){

            // initialize variable that will hold the random artist object
            let randomArtist = {};

            // pick a random artist and store name and url properties in object
            const randomNumber = Math.floor(Math.random() * returnedListOfArtists.length);
            randomArtist.name = returnedListOfArtists[randomNumber].name;
            randomArtist.url = returnedListOfArtists[randomNumber].url

            // save the random artist object in a new array
            randomArtistArray.push(randomArtist);

            // remove the artist from the similar artist array
            returnedListOfArtists.splice(randomNumber, 1);
          }

          // update state with array of random artists
          setSimilarArtists(randomArtistArray);

        }
      })   
    }, [artist])

  


  return (
    
    <>
    <h3>Here are some similar artists that you might enjoy</h3>
    <p>Click on their name to learn more about them at Last FM</p>
    <ul>
      {
        similarArtists.map((artist) => {
          return(
            <li key={`${artist.name}`}>
              <button className="artistLink" aria-label="on click, opens link to artist details on LastFM in new tab"  onClick={() => {window.open(artist.url)}}>{artist.name}</button>
            </li>
          )
        })
      }
    </ul>






    {/* <DisplaySongs songs={newSongList} />
   */}
       
      
    </>
  )
}


export default GetMoreSongs;