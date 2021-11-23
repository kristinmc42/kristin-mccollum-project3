// this componenet displays the random songs on the page



function DisplaySongs({songs}) {

  return(
    <ul>
      {
        songs.map(song => {
          return(
            
              <li key={song.playcount}>
                <p>{song.artist} ~ <button className="songLink" aria-label="on click, opens link to song details on LastFM in new tab"  onClick={() => {window.open(song.url)}}>{song.name}</button> </p>
              </li>
             
          )
        })
      }
    </ul>
  )
}


export default DisplaySongs;