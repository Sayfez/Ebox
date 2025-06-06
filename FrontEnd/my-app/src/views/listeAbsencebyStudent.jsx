import React, { useEffect, useState } from 'react';
import etudiants from '../services/presences';
import { useParams } from 'react-router-dom';
import presences from '../services/presences';
import Swal from 'sweetalert2';
import Footer from '../components/footer';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import axios from 'axios';
const ListAbsencebyStudent = () => {
  const [list, setList] = useState([]);
  const [affiche, setAffiche] = useState(false);
  const { id } = useParams();
  const getList = () => {
    presences.getPresenceByEtudiant(id).then((res) => {
      setList(res.data.data);
      setAffiche(true);
    });
  };
  const updateEtat = (id) => {
    Swal.fire({
      title: "Do you want to change the state?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        presences.updateEtat(id).then((res) => {
          getList();
        }).catch((err) => {
          console.log(err);
        });
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  // Function to declare a student as absent
  const declareAbsence = (seanceId) => {
    Swal.fire({
      title: "Are you sure you want to declare this student as absent?",
      showCancelButton: true,
      confirmButtonText: "Yes, declare as absent",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        presences.updateEtat(seanceId, { Etat: false }) // Assuming false represents 'absent'
          .then((res) => {
            getList(); // Refresh the list after updating the status
          }).catch((err) => {
            console.log(err);
          });
        Swal.fire("Marked as absent!", "", "success");
      }
    });
  };
  useEffect(() => {
    getList();
  }, [id]);
  const [dataUser, setdataUser] = useState({});
  const getUserById = async () => {
    const response = await axios.get(`http://localhost:3003/users/${id}`);
    setdataUser(response);
  };
  useEffect(() => {
    getUserById();
  }, [id]);
  const [cells, setCells] = useState([]);
  const [predictedY, setPredictedY] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datauser = dataUser;
        const Email = datauser.data.data.Email;
        const response = await axios.get(`http://127.0.0.1:5000/res/${Email}`);
        setCells(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dataUser]);
  const getStatus = () => {
    return cells === 'A' ? 'Absent' : 'Present';
  };
  if (affiche) {
    return (
      <div className="container-xxl position-relative bg-white d-flex p-0">
        {/* Sidebar Start */}
        <Sidebar></Sidebar>
        {/* Sidebar End */}
        {/* Content Start */}
        <div className="content">
          {/* Navbar Start */}
          <Header></Header>
          {/* Sale & Revenue Start */}
          <div className="container-fluid pt-4 px-4">
            <div className="bg-light text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Liste des Presences</h6>
                <a href="#">Show All</a>
              </div>
              <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr className="text-dark">
                      <th scope="col">Date Seance</th>
                      <th scope="col">Matiere</th>
                      <th scope="col">Présence</th>
                      <th scope="col">Actions</th>
                      <th scope="col">Note CC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.IdSeance.DateSc}</td>
                          <td>{item.IdSeance.IdMatiere.NomMatiere}</td>
                          <td>{(item.Etat ? 'Présent' : 'Absent').toString()}</td>
                          <td>
                            <button className="btn btn-sm btn-primary" onClick={() => updateEtat(item._id)}>Modifier l'état</button>
                            <button className="btn btn-sm btn-danger" onClick={() => declareAbsence(item._id)}>Déclarer Absent</button>
                          </td>
                          <td>{item.mark}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                Prédiction de la prochaine séance : {getStatus()}
              </div>
            </div>
          </div>
          {/* Footer Start */}
          <Footer></Footer>
          {/* Footer End */}
        </div>
        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
      </div>
    );
  }
};
export default ListAbsencebyStudent;