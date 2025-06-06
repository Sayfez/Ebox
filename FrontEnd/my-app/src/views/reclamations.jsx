
import reclamationService from '../services/reclamationService'
import userService from '../services/userService'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal
 from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'


const Reclamations= () => {
    const [reclamation,setReclamation]=useState({})
    const [affiche,setAffiche]=useState(false)

     //fct delete //
  const Delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        reclamationService.DeleteOne(id).then((res) => {
          getListReclamation();
        })
        Swal.fire({
          title: "Deleted!",
          text: "item has been deleted.",
          icon: "success"
        });
      }
    });
  }
//

const getListReclamation=()=>{
   reclamationService.GetALL().then((res)=>{
      console.log(res);
      setReclamation(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getListReclamation()
  },[])

  if(affiche){
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
    {/* Sale & Revenue Start */}
      <div className="container-fluid pt-4 px-4">
      <div className="bg-light text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Liste des réclamations</h6>
          <a href>Show All</a>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                
                <th scope="col">Utilisateur</th>
                <th scope="col">Objet</th>
                <th scope="col">Message</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {reclamation?.map((item)=>{
              return(
                <tr>
              
                <td>{item.Nom}</td>
                <td>{item.Objet}</td>
                <td>{item.Message}</td>
  
            
                <td>  <Link to={`/userReclamation/${item._id}`}><button className="btn btn-sm btn-primary" >Consulter</button></Link>
                  
                  <button style={{marginLeft:"10px"}} className="btn btn-sm btn-danger" onClick={(e)=>Delete(item._id)}>Supprimer</button>
                  </td>
               
              </tr>
              )
            })}
         

            
          </tbody>
        </table>
      </div>
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

}

export default Reclamations