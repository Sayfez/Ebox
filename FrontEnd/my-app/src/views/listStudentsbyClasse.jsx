import React, { useEffect, useState } from 'react'
import etudiants from '../services/etudiantsservice'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

const ListStudentsbyClasse = () => {
    const [list,setList]=useState({})
    const [affiche,setAffiche]=useState(false)
    const{id}=useParams()
    const getList=()=>{
      etudiants.GetStudents(id).then((res)=>{
        console.log(res);
        setList(res.data.data)
        setAffiche(true)
      }) 
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
        <h6 className="mb-0">Liste des Etudiants</h6>
        <a href>Show All</a>
      </div>
      <div className="table-responsive">
        <table className="table text-start align-middle table-bordered table-hover mb-0">
          <thead>
            <tr className="text-dark">
            <th scope="col">Photo</th>
              <th scope="col">Nom </th>
              <th scope="col">Prenom</th>
              <th scope="col">Tag </th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {list?.map((item)=>{
              return(
                <tr>
              
                <td><img src={`http://localhost:3003/file/users/${item.Photo}`} style={{width:"100px"}}></img></td>
                
                
                
                <td>{item.Name}</td>
                <td>{item.FamilyName}</td>
                
                <td>{item.Tag}</td>
                
                <td>{item.Email}</td>
  
            
                <td>  <Link to={`/listabsencebystudent/${item._id}`}><button className="btn btn-sm btn-primary" >Afficher Presences</button></Link></td>
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

export default ListStudentsbyClasse