import React, { useState, useEffect } from "react";
import seanceservice from "../services/seanceservice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import enseignantsservice from "../services/enseignantsservice";
import matieresservice from "../services/matieresservice";
import sallesservice from "../services/sallesservice";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";

const Ajouterseance = () => {
  const [seance, setSeance] = useState({});
  const [affiche, setAffiche] = useState(false);
  const [enseignant, setEnseignant] = useState([]);
  const [matieres, setMatiere] = useState([]);
  const [salle, setSalle] = useState([]);
  const navigate = useNavigate();

  const onchangeHandler = (e) => {
    setSeance({
      ...seance,
      [e.target.name]: e.target.value,
    });
  };

  const getListEnseignants = () => {
    enseignantsservice
      .GetALL()
      .then((res) => {
        console.log(res);
        setEnseignant(res.data.data);
        setAffiche(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListMatieres = () => {
    matieresservice
      .GetALL()
      .then((res) => {
        console.log(res);
        setMatiere(res.data.data);
        setAffiche(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListSalles = () => {
    sallesservice
      .GetALL()
      .then((res) => {
        console.log(res);
        setSalle(res.data.data);
        setAffiche(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListEnseignants();
    getListMatieres();
    getListSalles();
  }, []);

  const onsubmitHandler = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        seanceservice
          .Create(seance)
          .then((res) => {
            console.log(res);
            navigate("/");
            Swal.fire("Saved!", "", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  if (affiche) {
    return (
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="col-sm-12 col-xl-6" style={{ margin: "180px" }}>
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Plannifier une séance</h6>
              <form onSubmit={onsubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="DateSc" className="form-label">
                    Date de la séance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="DateSc"
                    onChange={onchangeHandler}
                    name="DateSc"
                    placeholder="Enter la date de la séance (YYYY-MM-DD)"
                  />
                  <label htmlFor="HeureDebut" className="form-label">
                    Heure de début de la séance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="HeureDebut"
                    onChange={onchangeHandler}
                    name="HeureDebut"
                    placeholder="Enter l'heure de début de la séance (HH:MM)"
                  />
                  <label htmlFor="HeureFin" className="form-label">
                    Heure de fin de la séance
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="HeureFin"
                    onChange={onchangeHandler}
                    name="HeureFin"
                    placeholder="Enter l'heure de fin de la séance (HH:MM)"
                  />
                  <label htmlFor="IdSalle" className="form-label">
                    La salle de la séance
                  </label>
                  <select
                    className="form-control"
                    name="IdSalle"
                    onChange={onchangeHandler}
                  >
                    <option value="">Choisir la salle</option>
                    {salle.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.NumSalle}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="IdMatiere" className="form-label">
                    Matière
                  </label>
                  <select
                    className="form-control"
                    name="IdMatiere"
                    onChange={onchangeHandler}
                  >
                    <option value="">Choisir la matière</option>
                    {matieres.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.NomMatiere}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="IdEnseignant" className="form-label">
                    Enseignant
                  </label>
                  <select
                    className="form-control"
                    name="IdEnseignant"
                    onChange={onchangeHandler}
                  >
                    <option value="">Choisir l'enseignant</option>
                    {enseignant.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.Username}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  } else {
    return null;  
  }
};

export default Ajouterseance;
