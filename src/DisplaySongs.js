// this componenet displays the random songs on the page

function DisplaySongs([songs]) {
  return(
    <ul>
      {
        songs.map(song => {
          return(
            <>
              <li key={song.mbid}>
                <p>{song.artist} <a href={song.url}>{song.name}</a></p>
              </li>
             </>
          )
        })
      }
    </ul>
  )
}


export default DisplaySongs;