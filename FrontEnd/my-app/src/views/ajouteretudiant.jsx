import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import etudiantsservice from '../services/etudiantsservice'
import classeservice from '../services/classeservice'
import { useEffect } from 'react'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'


const Ajouteretudiant= () => {
    const [etudiant,setEtudiant]=useState({role:'etudiant'})
    const [image,setImage]=useState([])

    const onchangeHandler=(e)=>{
        setEtudiant({
            ...etudiant,[e.target.name]:e.target.value
        })
        console.log(etudiant)
    }

    const [classe,setClasse]=useState({})
    const [affiche,setAffiche]=useState(false)
  
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

    const navigate=useNavigate()
const onsubmitHandler=(e)=>{
  const formdata=new FormData()
  formdata.append('Name',etudiant.Name)
  formdata.append('FamilyName',etudiant.FamilyName)
  formdata.append('Username',etudiant.Username)
  formdata.append('Password',etudiant.Password)
  formdata.append('Email',etudiant.Email)
  formdata.append('Tag',etudiant.Tag)
  formdata.append('Identifiant',etudiant.Identifiant)
  formdata.append('role',etudiant.role)
  formdata.append('IdClasse',etudiant.IdClasse)
  for (let i = 0;i<image.length;i++){
    formdata.append('file',image[i])
  }
  
    e.preventDefault()
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {

        if (result.isConfirmed) {
            etudiantsservice.Create(formdata).then((res)=>{
                console.log(res)
                navigate('/classlist')
        
            }).catch((err)=>{
                console.log(err)
            })
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

    }
    const imagehandle=(e)=>{
      setImage(e.target.files)
    }
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
        <div className="col-sm-12 col-xl-6" style={{margin:"180px"}}>
        <div className="bg-light rounded h-100 p-4">
          <h6 className="mb-4">Ajouter un nouveau Etudiant</h6>
          <form>
            <div className="mb-3">

              <label htmlFor="exampleInputEmail1" className="form-label">Nom de l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Name" placeholder='Enter le nom de l`etudiant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">Prènom de l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="FamilyName" placeholder='Enter le prènom de l`etudiant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">Le nom d'utilisateur de l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Username" placeholder='Enter le nom d`utilisateur de l`etudiant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">Le Mot de passe de l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Password" placeholder='Enter le Mot de passe de l`etudiant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">L'adresse Email de l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Email" placeholder='Enter l`Email l`etudiant'/>
              
              <label  htmlFor="exampleInputEmail1" className="form-label">L'Image de l'etudiant</label>
              <input type="file"className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={imagehandle}  name="Photo" placeholder='Enter l`imagede l`etudiant'/>
              
              <label htmlFor="exampleInputEmail1" className="form-label">l`RFID l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Tag" placeholder='Enter l`RFID de l`etudiant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">L'Identifiant de l'etudiant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Identifiant" placeholder='Enter l`Identifiant de l`etudiant'/>              
              <label htmlFor="exampleInputEmail1" className="form-label">La classe de l'etudiant</label>
              <select name='IdClasse' onChange={onchangeHandler}>
              {classe?.map((item)=>{
                
              return(
              <option value={item._id}>{item.Name}</option>)})}
              </select> 


            </div>
            
            <button style={{marginLeft: "200px"}} type="submit" className="btn btn-primary" onClick={onsubmitHandler}>Ajouter</button>
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
    }
      export default Ajouteretudiant