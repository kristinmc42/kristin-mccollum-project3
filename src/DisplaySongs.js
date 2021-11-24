// this componenet displays the random songs on the page
// recieves array of songs and number of songs as props
// makes a shallow copy of the number of songs selected by the user using slice and then maps through that array to display them on the page



function DisplaySongs({songs, number}) {
  // error handling if no option is selected when form is submitted
  const numOfSongs = number === "placeholder" ? 5 : number;
  
  return(
    <ul>
      {
        songs.slice(0, numOfSongs).map(song => {
        
          return(
              <li key={song.playcount}>
                <button className="songLink" aria-label="on click, opens link to song details on LastFM in new tab"  onClick={() => {window.open(song.url)}}>{song.name}</button>
              </li>
             
          )
        })
      }
    </ul>
  )
}


export default DisplaySongs;