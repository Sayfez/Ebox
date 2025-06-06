import React, { useEffect, useState } from 'react';
import seanceservice from '../services/seanceservice';
import authService from '../services/authService'; // Adjust the path accordingly

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const SeancesOfEnseignant = () => {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [affiche, setAffiche] = useState(false);

  const getList = async () => {
    try {
      const res = await seanceservice.getSeancesByEnseignant(id);
      console.log(res);
      setList(res.data);
      setAffiche(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'There was an error fetching the data', 'error');
    }
  };

  useEffect(() => {
    getList();
  }, [id]);

  if (!affiche) {
    return <div>Loading...</div>;
  }
///////////////////////////////////////////
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="container-fluid pt-4 px-4">
          <div className="bg-light text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Mes séances</h6>
              <a href>Show All</a>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-dark">
                    <th scope="col">Date Seance</th>
                    <th scope="col">Matiere</th>
                    <th scope="col">Salle</th>
                    <th scope="col">Classe</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item) => (
                    <tr key={item._id}>
                      <td>{new Date(item.DateSc).toLocaleDateString()}</td>
                      <td>{item.IdMatiere.NomMatiere}</td>
                      <td>{item.IdSalle.NumSalle}</td>
                      <td>
                        <Link to={`/seanceinfo/${item._id}`} className="btn btn-sm btn-primary">
                          Consulter
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button style={{ marginTop:"20px",marginLeft: "60px", fontSize: "20px" , height: "37px"}} className="btn btn-sm btn-danger" onClick={handlePrint}>
        Imprimer
        </button>
        <Footer />
      </div>
      <a href="#" className="btn btn-lg btn-primary btn-lg-square">
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
};

export default SeancesOfEnseignant;
