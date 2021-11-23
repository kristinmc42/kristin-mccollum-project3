// takes userInput as a prop
// makes an API call to get similar artist to userInput
// selects 5 random artist from results
// makes an API call for each of those artists to get one track from each
// returns an array with those 5 songs

import axios from "axios";
import { useState, useEffect } from "react";
import DisplaySongs from "./DisplaySongs";

function GetMoreSongs(artist){
  // call API based on artist name 
    const apiKey = "55a0c662e159f9a95c530a23f4af3da8";
    
    
    const [newSongList, setNewSongList] = useState([]);

    // console.log(`this is the artist passed as props:`, artist)

    useEffect(() => {
      
      axios({
        url: "http://ws.audioscrobbler.com/2.0/",
        params: {
          format: "json",
          method: "artist.getsimilar",
          api_key: apiKey,
          artist: artist.artist,
          autocorrect: [0 | 1]
        }
      })
      .then(response => {
        if (response.length !== 0){
          // console.log(`this is the results from the similarartists api call:`, response)
          // make a copy of the results and save it in a variable
          const similarArtists = [...response.data.similarartists.artist];
    
          // console.log(similarArtists)
    
          let randomArtist = "";
          const randomArtistArray =[];
          const newSongSuggestions =[];
          
          // pick 5 random artists from similar Artists
          // save each artist in an object
          for (let index = 1; index < 6; index++){
            randomArtist = similarArtists[Math.floor(Math.random() * similarArtists.length)].name;
            
            // save the artist name in a new array
            randomArtistArray.push(randomArtist);
          }

          console.log("this is the random array", randomArtistArray)
         

          // call API for each of the artist results to get a track for each of them 
          
          randomArtistArray.map((newArtist) => {
            console.log("inside map", newArtist)
            axios({
              url: "http://ws.audioscrobbler.com/2.0/",
              params: {
                format: "json",
                method: "artist.gettoptracks",
                api_key: apiKey,
                artist: newArtist,
                autocorrect: [0 | 1]
              }
            })
            .then(response => {
              if (response.length !== 0){
                // make a copy of the results and save it in a variable
              const allArtistsSongs = [...response.data.toptracks.track];
              // pick a random track from the array
              const randomSong = allArtistsSongs[Math.floor(Math.random() * allArtistsSongs.length)];

              // add artist property with value of newArtist
              randomSong.artist = newArtist;

              //save random song in an array newSongList 
              newSongSuggestions.push(randomSong);
              console.log(newSongSuggestions)

              }
            })
            return newSongSuggestions;
          })
        console.log(newSongSuggestions)
        setNewSongList(newSongSuggestions);
        }
      })
    }, [])

  


  return (
    
    <>
    <p>"Here are some songs by similar artists that you might enjoy."</p>
   
    <DisplaySongs songs={newSongList} />
  
       
      
    </>
  )
}


export default GetMoreSongs;