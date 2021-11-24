function Footer(){
  return(
    <footer>
      <p>Copyright ©2021  Created by <button className="footerLinks" onClick={() => {window.open("https://therealkristin.com/")}}>Kristin McCollum</button > at <button className="footerLinks" onClick={() => {window.open("https://junocollege.com/")}}>Juno College</button></p> 
      <p>Powered by the <button className="footerLinks" onClick={() => {window.open("https://www.last.fm/api")}}>LastFM API</button></p>
    </footer>
  )
}

export default Footer;