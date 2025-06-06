import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import enseignantsservice from '../services/enseignantsservice'
import Footer from '../components/footer'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

const Ajouterenseignant= () => {
  const [enseignant,setEnseignant]=useState({role:'enseignant'})
  const [image,setImage]=useState([])

    const onchangeHandler=(e)=>{
        setEnseignant({
            ...enseignant,[e.target.name]:e.target.value
        })
        console.log(enseignant)
    }
    
  const [affiche,setAffiche]=useState(false)
  

    
    const navigate=useNavigate()
    const onsubmitHandler=(e)=>{

  const formdata=new FormData()
  formdata.append('Name',enseignant.Name)
  formdata.append('FamilyName',enseignant.FamilyName)
  formdata.append('Username',enseignant.Username)
  formdata.append('Password',enseignant.Password)
  formdata.append('Email',enseignant.Email)
  formdata.append('Tag',enseignant.Tag)
  formdata.append('Identifiant',enseignant.Identifiant)
  formdata.append('role',enseignant.role)

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
            enseignantsservice.Create(formdata).then((res)=>{
                console.log(res)
                navigate('/enseignantlist')
        
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
          <h6 className="mb-4">Ajouter un nouveau Enseignant</h6>
          <form>
            <div className="mb-3">

              <label htmlFor="exampleInputEmail1" className="form-label">Nom de l'enseignant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Name" placeholder='Enter le nom de l`enseignant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">Prènom de l'enseignant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="FamilyName" placeholder='Enter le prènom de l`enseignant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">Le nom d'utilisateur de l'enseignant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Username" placeholder='Enter le nom d`utilisateur de l`enseignant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">Le Mot de passe de l'enseignant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Password" placeholder='Enter le Mot de passe de l`enseignant'/>
              <label htmlFor="exampleInputEmail1" className="form-label">L'adresse Email de l'enseignant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Email" placeholder='Enter l`Email l`enseignant'/>
              
              <label htmlFor="exampleInputEmail1" className="form-label">l`RFID l'enseignant</label>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangeHandler}  name="Tag" placeholder='Enter l`RFID de l`enseignant'/>
              
              <label  htmlFor="exampleInputEmail1" className="form-label">L'Image de l'ensiegnant</label>
              <input type="file"className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={imagehandle}  name="Photo" placeholder='Enter l`imagede l`ensiegnant'/>
              
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={onsubmitHandler} style={{marginLeft: "200px"}}>Ajouter</button>
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
    
      export default Ajouterenseignant