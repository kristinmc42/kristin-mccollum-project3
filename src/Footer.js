function Footer(){
  return(
    <footer>
      <div className="wrapper">
        <p>Copyright ©2021  Created by 
          <button className="footerLinks" onClick={() => {window.open("https://therealkristin.com/")}} aria-label="opens website of the realkristin.com in a new tab">Kristin McCollum</button > 
          at 
          <button className="footerLinks" onClick={() => {window.open("https://junocollege.com/")}} aria-label="opens website for Juno College in a new tab">Juno College</button>
        </p> 
        <div className="credits">
          <p>Powered by the <button className="footerLinks" onClick={() => {window.open("https://www.last.fm/api")}} aria-label="opens website for Last FM in a new tab">LastFM API.</button></p>
          <p> Icons from<button className="footerLinks" onClick={() => {window.open("https://icons8.com/")}} aria-label="opens website for icons8.com in a new tab">icons8</button></p>
        </div>

      </div>
    </footer>
  )
}

export default Footer;