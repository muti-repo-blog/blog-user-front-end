import "../css/header.css"

const Footer = () => {

  return (
    <footer>
      <div className="container">
        <div className="emptySpace"></div>
        <div className="footerSpace">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/jomcbob" className="footerLink">
            <span className="footerCopywrite">&copy;</span>
            <span className="footerName">Jomcbob</span>
            <span className="footerDate">2026</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer