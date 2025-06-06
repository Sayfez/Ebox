
import enseignantsservice from '../services/enseignantsservice'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal
 from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'


const Enseignants = () => {
    const [enseignant,setEnseignant]=useState({})
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
        enseignantsservice.DeleteOne(id).then((res) => {
          getListEnseignants();
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

const getListEnseignants=()=>{
   enseignantsservice.GetALL().then((res)=>{
      console.log(res);
      setEnseignant(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getListEnseignants()
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
          <h6 className="mb-0">Liste des Enseigannts</h6>
          <a href>Show All</a>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {enseignant?.map((item)=>{
              return(
                <tr>
              
                <td>{item.Name}</td>
                <td>{item.FamilyName}</td>
                <td>{item.Email}</td>
  
            
                <td>  <Link to={`/listpresenceEnseignant/${item._id}`}><button className="btn btn-sm btn-primary" >Afficher Presences</button></Link>
                  
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

export default Enseignants