export default function Footer() {
    return (
      <div style={{ padding: "12px 0", backgroundColor: "rgb(232, 227, 227)", textAlign: 'center', position: 'fixed', width: '100%', height: '90px', bottom: '0', left: '0', right: '0', zIndex: '999', boxShadow: '0px -1px 5px rgba(0, 0, 0, 0.2)' }}>
        
        <div style={{ marginBottom: '5px' }}>
          <h5>
            <a href="http://localhost:5173/" style={{ textDecoration: "none", color: "red", fontWeight: 'bold' }}>SCHOLAR FINDER</a>
          </h5>
        </div>
        
        <div style={{ fontSize: '15px' }}>
          <a href="/" style={{ textDecoration: "none", color: "#555", margin: "0 10px" }}>Frontpage</a>
          <a href="/contact" style={{ textDecoration: "none", color: "#555", margin: "0 10px" }}>Contact</a>
          <a href="/about" style={{ textDecoration: "none", color: "#555", margin: "0 10px" }}>About</a>
          <a href="/blog" style={{ textDecoration: "none", color: "#555", margin: "0 10px" }}>Blog</a>
          <a href="https://www.linkedin.com/in/waqas-ahmed-mangi-b44930242/" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#555", margin: "0 10px" }}>LinkedIn</a>
        </div>
  
        <div style={{ marginTop: '5px' }}>
          <a href="https://www.linkedin.com/in/waqas-ahmed-mangi-b44930242/" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin mx-2" style={{ fontSize: "20px", color: "#555" }}></i>
          </a>
          <a href="https://akshata-ganbote.netlify.app/" target="_blank" rel="noreferrer">
            <i className="bi bi-globe mx-2" style={{ fontSize: "20px", color: "#555" }}></i>
          </a>
          <a href="https://github.com/AkshataGanbote" target="_blank" rel="noreferrer">
            <i className="bi bi-github mx-2" style={{ fontSize: "21px", color: "#555" }}></i>
          </a>
          <a href="mailto:akshataganbote61843@gmail.com" target="_blank" rel="noreferrer">
            <i className="bi bi-envelope-fill mx-2" style={{ fontSize: "21px", color: "#555" }}></i>
          </a>
        </div>
      </div>
    );
  }
  