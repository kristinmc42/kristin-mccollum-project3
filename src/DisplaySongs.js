// this componenet displays the random songs on the page



function DisplaySongs({songs, number}) {
  const numOfSongs = number === "placeholder" ? 5 : number;
  
  console.log(numOfSongs)
  return(
    <ul>
      {
        songs.slice(0, numOfSongs).map(song => {
          console.log(song)
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