import React, { useEffect, useState } from 'react'
import reclamationService from '../services/reclamationService'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

const UserReclamation = () => {
    const [reclamation,setReclamation]=useState()
    const [list,setList]=useState({})
    const [affiche,setAffiche]=useState(false)
    const{id}=useParams()
    const getList=()=>{
        reclamationService.GetById(id).then((res)=>{
            console.log(res.data.data);
            setList(res.data.data)
            setAffiche(true)
            console.log('liste:',list)
          }) 
}
useEffect(()=>{
    getList()
},[])



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
        <h6 className="mb-0">Reclamation :</h6>
        <a href>Show All</a>
      </div>
      <div className="table-responsive">
        <table className="table text-start align-middle table-bordered table-hover mb-0">
          <thead>
            <tr className="text-dark">
            <th scope="col">Objet</th>
              <th scope="col">Message</th>
       
            </tr>
          </thead>
          <tbody>

          { list && list.length > 0 &&
          affiche &&
          list.map((item)=>{
            return(
              <tr>
            
              <td>{item.Objet}</td>
              
              <td>{item.Message}</td> 
          
            </tr>
            )
          }) //: null 
        }
       

          
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

export default UserReclamation