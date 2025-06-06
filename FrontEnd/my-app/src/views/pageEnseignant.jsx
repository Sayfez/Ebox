/*import React, { useEffect, useState } from 'react'
import enseignant from '../services/presenceEnseignant'
import { Link, useParams } from 'react-router-dom'
import presenceEnseignant from '../services/presenceEnseignant'
import Swal from 'sweetalert2'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'


const PageEnseignant = () => {
  //
  const { userId } = useParams();
  //
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

useEffect(()=>{
    getList()
},[])

if (affiche){
    return (
      <div className="container-xxl position-relative bg-white d-flex p-0">
  {/} 
  
  {/ }
 <Sidebar></Sidebar>
  {}
  {/}
  <div className="content">
    {/}
    <Header></Header>
    
    {/}
    {/}
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
  
            
                
              </tr>
              )
            })}
         

            
          </tbody>
        </table>
      </div>
    </div>
  </div>
    {/}
    {/}
<Footer></Footer>

{/}
</div>
{/}
{/}
<a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
</div>

  )
}
}

export default PageEnseignant*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import presenceEnseignant from '../services/presenceEnseignant';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import Swal from 'sweetalert2';

const PageEnseignant = () => {
  const { id } = useParams(); // Extract the 'id' from the URL
  const [list, setList] = useState([]);
  const [affiche, setAffiche] = useState(false);

  const getList = async () => {
    try {
      const res = await presenceEnseignant.getPresenceByEnseignant(id);
      console.log(res);
      setList(res.data.data);
      setAffiche(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'There was an error fetching the data', 'error');
    }
  };

  useEffect(() => {
    if (id) {
      getList();
    }
  }, [id]);

  if (!affiche) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <Sidebar />
      <div className="content">
        <Header />
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
                  {list.map((item) => (
                    <tr key={item.IdSeance._id}>
                      <td>{item.IdSeance.DateSc}</td>
                      <td>{item.IdSeance.IdMatiere.NomMatiere}</td>
                      <td>{item.State.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a href="#" className="btn btn-lg btn-primary btn-lg-square">
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
  
};

export default PageEnseignant;



