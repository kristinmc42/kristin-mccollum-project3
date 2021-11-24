// takes userInput as a prop
// makes an API call to get similar artist to userInput
// selects 5 random artist from results
// makes an API call for each of those artists to get one track from each
// returns an array with those 5 songs

import axios from "axios";
import { useState, useEffect } from "react";
// import DisplaySongs from "./DisplaySongs";

function GetMoreSongs({artist}){
  // call API based on artist name 
    const apiKey = "55a0c662e159f9a95c530a23f4af3da8";
    
    const [similarArtists, setSimilarArtists] = useState([]);
    // const [newSongList, setNewSongList] = useState([]);


    useEffect(() => {
      
      axios({
        url: "http://ws.audioscrobbler.com/2.0/",
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
          console.log(returnedListOfArtists)
          let randomArtist = {};
          const randomArtistArray =[];
          // const newSongSuggestions =[];
          

          // 🚨 🚨 I BROKE THIS - IT IS OVERWRITING SO ARRAY IS ALL THE SAME LAST OBJECT 🚨🚨
          // pick 5 random artists from similar Artists
          // save each artist in an object
          for (let index = 1; index < 6; index++){
            const randomNumber = Math.floor(Math.random() * returnedListOfArtists.length);
            randomArtist.name = returnedListOfArtists[randomNumber].name;
            randomArtist.url = returnedListOfArtists[randomNumber].url

            // save the random artist in a new array
            randomArtistArray.push(randomArtist);

            // remove the artist from the similar artist array
            returnedListOfArtists.splice(randomNumber, 1);

            console.log(randomArtistArray, randomArtist)
          }

          console.log("this is the random array", randomArtistArray)
         setSimilarArtists(randomArtistArray);

          // call API for each of the artist results to get a track for each of them 
          // for (const newArtist of randomArtistArray){
            
          //   axios({
          //     url: "http://ws.audioscrobbler.com/2.0/",
          //     params: {
          //       format: "json",
          //       method: "artist.gettoptracks",
          //       api_key: apiKey,
          //       artist: newArtist,
          //       autocorrect: [0 | 1]
          //     }
          //   })
          //   .then(response => {
          //     if (response.length !== 0){
          //       // make a copy of the results and save it in a variable
          //     const allArtistsSongs = [...response.data.toptracks.track];
          //     // pick a random track from the array
          //     const randomSong = allArtistsSongs[Math.floor(Math.random() * allArtistsSongs.length)];

          //     // add artist property with value of newArtist
          //     randomSong.artist = newArtist;

          //     //save random song in an array  
          //     newSongSuggestions.push(randomSong);
             
          //     // set state adding in random song
          //     setNewSongList([...newSongList, randomSong]);
          //     }
          //   })
          // }
        }
      })   
    }, [artist])

  


  return (
    
    <>
    <p>Here are some similar artists that you might enjoy.</p>
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