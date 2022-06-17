import linkedIn from "../../images/linkedInIcon.png";
import github from "../../images/githubIcon.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      {/* <div> */}
      <div className="builtWith">
        <span>React</span>
        <span>Redux</span>
        <span>Python</span>
        <span>Javascript</span>
        <span>HTML5</span>
        <span>CSS</span>
        <span>React</span>
        <span>Flask</span>
        <span>SQLAlchemy</span>
        <span>Docker</span>
      </div>
      <hr></hr>
      <div className="myName">Briana Robinson</div>
      <div className="me">
        <a href="https://www.linkedin.com/in/briana-robinson-083355104/">
          <img className="footerIcons" src={linkedIn}></img>
        </a>
        <a href="https://github.com/BriRob">
          <img className="footerIcons" src={github}></img>
        </a>
      </div>
      {/* </div> */}
    </footer>
  );
}

export default Footer;
