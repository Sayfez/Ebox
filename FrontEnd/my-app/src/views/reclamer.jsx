import React, { useState } from 'react'
import reclamationService from '../services/reclamationService'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

const Reclamer = () => {
    const [reclamation,setReclamation]=useState()

    const onchangeHandler=(e)=>{
        setReclamation({
            ...reclamation,[e.target.name]:e.target.value
        })
        console.log(reclamation)
    }
    const navigate=useNavigate()
const onsubmitHandler=(e)=>{
    e.preventDefault()
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            reclamationService.Create(reclamation).then((res)=>{
                console.log(res)
                navigate('/')
        
            }).catch((err)=>{
                console.log(err)
            })
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
   
}

return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      {/* Spinner Start */}
      
      {/* Sidebar Start */}
      <Sidebar></Sidebar>
      {/* Sidebar End */}
      
      {/* Content Start */}
      <div className="content">
        {/* Navbar Start */}
        <Header></Header>
        {/* Navbar End */}
        
        {/* Main Content Start */}
        <div className="col-sm-12 col-xl-6" style={{ margin: "180px" }}>
          <div className="bg-light rounded h-100 p-4" style={{ backgroundColor: "#f0f0f0", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h6 className="mb-4" style={{ color: "#358" }}>Espace Réclamation</h6>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Objet :</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler} name="Objet" placeholder='Ecrire l`objet de réclamation'/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Message :</label>
                <input style={{ width: '100%', height: '200px', fontSize: '16px'  }} type="text" className="form-control" id="exampleTextArea" aria-describedby="textHelp" onChange={onchangeHandler} name="Message" placeholder='écrire votre message ici,'/>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#bd0000", borderColor: "#851515" }} onClick={onsubmitHandler}>Ajouter</button>
            </form>
          </div>
        </div>
        {/* Main Content End */}
        
        {/* Footer Start */}
        <Footer></Footer>
        {/* Footer End */}
      </div>
      {/* Content End */}
      
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
    </div>
  );
  }
  
  export default Reclamer