// this componenet displays the random songs on the page



function DisplaySongs({songs}) {

  return(
    <ul>
      {
        songs.map(song => {
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