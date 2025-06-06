import React, { useEffect, useState } from 'react'
import classeservice from '../services/classeservice'
import { Link } from 'react-router-dom'
import Swal
 from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'


const Classes = () => {
  const [userRole, setUserRole] = useState('');
  const [classe,setClasse]=useState({})
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
        classeservice.DeleteOne(id).then((res) => {
          getListClasse();
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

  const getListClasse=()=>{
    classeservice.GetALL().then((res)=>{
      console.log(res);
      setClasse(res.data.data)
      setAffiche(true)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getListClasse()
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
            <h6 className="mb-0">Liste des classes</h6>
            <a href>Show All</a>
          </div>
          <div className="table-responsive" >
            <table className="table text-start align-middle table-bordered table-hover mb-0" style={{ fontSize: "14px" }}>
              <thead>
                <tr className="text-dark">
                  <th scope="col">Classe</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {classe?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.Name}</td>
                      <td style={{ padding: "8px 3px" }}>
  <Link to={`/liststudentbyclasse/${item._id}`}>
    <button className="btn btn-sm btn-primary" style={{ fontSize: "16px", height: "35px", width: "100px" }}>Liste</button>
  </Link>
  <button style={{ marginLeft: "40px", fontSize: "14px", marginRight:"-50px" , height: "35px"}} className="btn btn-sm btn-danger" onClick={(e) => Delete(item._id)}>Supprimer</button>
</td>

                    </tr>
                  )
                })}
              
                <Link to="/ajouterclasse" style={{ fontSize: "20px",marginLeft: "-20px"}} className="nav-item nav-link"><i className="fa fa-table me-2" />Ajouter une classe</Link>  
               
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

export default Classes