import React, { useEffect, useState } from 'react'
import enseignant from '../services/presenceEnseignant'
import { Link, useParams } from 'react-router-dom'
import presenceEnseignant from '../services/presenceEnseignant'
import Swal from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'


const ListAbsencebyEnseignant = () => {
    const [list,setList]=useState({})
    const [affiche,setAffiche]=useState(false)
    const{id}=useParams()
    const getList=()=>{
        presenceEnseignant.getPresenceByEnseignant(id).then((res)=>{
            console.log(res);
            setList(res.data.data)
            setAffiche(true)
          }) 
}
const updateState=(id)=>{
  Swal.fire({
    title: "Do you want to change the state?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then((result) => {

    if (result.isConfirmed) {
        presenceEnseignant.updateState(id).then((res)=>{
            console.log(res)
            getList()
    
        }).catch((err)=>{
            console.log(err)
        })
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}
useEffect(()=>{
    getList()
},[])

if (affiche){
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
          <h6 className="mb-0">Liste des Presences</h6>
          <a href>Show All</a>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
              <th scope="col">Date Seance</th>
                <th scope="col">Matiere</th>
                <th scope="col">State</th>
              </tr>
            </thead>
            <tbody>

            {list?.map((item)=>{
              return(
                <tr>
              
                <td>{item.IdSeance.DateSc}</td>
                
                <td>{item.IdSeance.IdMatiere.NomMatiere}</td> 
                
                <td>{(item.State).toString()}</td>
  
            
                <td>  <button className="btn btn-sm btn-primary" onClick={(e)=>updateState(item._id)}>Modifier l'état</button></td>
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

export default ListAbsencebyEnseignant