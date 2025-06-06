import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

const Ajouteruser = () => {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
    {/* Spinner Start */}
    
    {/* Sidebar Start */}
   <Sidebar></Sidebar>
    {/* Sidebar End */}
    {/* Content Start */}
    
    <div className="content" >
      {/* Navbar Start */}
      <Header></Header>
      <body style={{ backgroundColor: "#f3f6f9",borderRadius: "20px",marginLeft: "-80px" }}>
      {/* Navbar End */}
      {/* Sale & Revenue Start */}
      <div className="col-sm-12 col-xl-12" style={{ width: "5px", fontSize: "100px", padding: "1px 270px", marginTop: "20px" }}>
        <div className="bg-light rounded h-800 p-4" style={{ backgroundColor: "#870303" }}>
    {/* Contenu à l'intérieur du div */}
        </div>

        <Link to="/ajouterenseignant" className="nav-item nav-link">
          <button type="button" className="btn btn-secondary" style={{ width: "400px", backgroundColor: "#2687f0", fontSize: "22px", padding: "15px 20px", marginTop: "-20px",marginLeft: "90px" }}>Ajouter un enseignant</button>
        </Link>

        <Link to="/ajouteretudiant" className="nav-item nav-link">
         <button type="button" className="btn btn-secondary" style={{ width: "400px", backgroundColor: "#2687f0", fontSize: "22px", padding: "15px 20px", marginTop: "-130px",marginLeft: "90px" }}>Ajouter un étudiant</button>
        </Link>
        </div>
        </body>

    {/* Footer Start */}

    <Footer></Footer>
{/* Footer End */}
</div>
{/* Content End */}
{/* Back to Top */}
<a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>

</div>

  )
}

export default Ajouteruser