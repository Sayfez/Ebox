import React, { useEffect, useState } from 'react'
import matieresservice from '../services/matieresservice'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'


const ListeMatieres = () => {
    const [matiere,setMatiere]=useState()
    const [affiche,setAffiche]=useState(false)
   

      const getListMatieres=()=>{
        matieresservice.GetALL().then((res)=>{
           console.log(res);
           setMatiere(res.data.data)
           setAffiche(true)
         }).catch((err)=>{
           console.log(err)
         })
       }
       useEffect(()=>{
        getListMatieres()
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

      <div className="container-fluid pt-4 px-4">
      <div className="bg-light text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Liste des matières</h6>
          <a href>Show All</a>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-dark">
                
                <th scope="col">Matiere</th>
              </tr>
            </thead>

            <tbody>
            {matiere?.map((item)=>{
              return(
                <tr>
                <td>{item.NomMatiere}</td>
              </tr>
            
        )
          })}

<td>
<Link style={{ fontSize: "20px",marginLeft: "360px"}} to="/ajoutermatiere" className="nav-item nav-link"><i className="fa fa-table me-2" />Ajouter Module</Link>
</td>

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

export default ListeMatieres