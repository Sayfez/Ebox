import React, { useState } from 'react'
import matieresservice from '../services/matieresservice'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

const Ajoutermatiere = () => {
    const [matiere,setMatiere]=useState()

    const onchangeHandler=(e)=>{
        setMatiere({
            ...matiere,[e.target.name]:e.target.value
        })
        console.log(matiere)
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
            matieresservice.Create(matiere).then((res)=>{
                console.log(res)
                navigate('/listeMatieres')
        
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
    <div>
      
    </div>
    {/* Navbar End */}
    {/* Sale & Revenue Start */}
  <div className="col-sm-12 col-xl-6" style={{margin:"180px"}}>
  <div className="bg-light rounded h-100 p-4">
    <h6 className="mb-4">Ajouter Module</h6>
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Nom de la Matiere</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="NomMatiere" placeholder='Enter le nom de la matiere'/>
        
      </div>
      
      <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#bd0000", borderColor: "#851515", marginLeft:"200px" }}onClick={onsubmitHandler}>Ajouter</button>
    </form>
  </div>
</div>
  {/* Widgets End */}
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

export default Ajoutermatiere