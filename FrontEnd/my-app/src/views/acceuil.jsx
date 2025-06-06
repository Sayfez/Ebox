 
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import Layout from "./layout";
import { Outlet } from "react-router-dom";
import enseignantsservice from "../services/enseignantsservice";
import etudiantsservice from "../services/etudiantsservice";
import sallesservice from "../services/sallesservice";
import seanceservice from "../services/seanceservice";
import matieresservice from "../services/matieresservice";

import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

const Acceuil = () => {
  const [userRole, setUserRole] = useState('');
  const [etudiants, setEtudiant] = useState({});
  const [enseignant, setEnseignant] = useState({});
  const [enseig, setEnseig] = useState([]);

  const [salles, setSalle] = useState({});
  const [seance, setSeance] = useState({});
  const [affiche, setAffiche] = useState(false);

  const [part, setpart] = useState();
  const [data, setData] = useState([  ]);

  const getAllStudents = () => {
    etudiantsservice
      .GetALL()
      .then((res) => {
        console.log(res);
        setEtudiant(res.data.data);
        setAffiche(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllStudents();
  }, []);
  const getAllEnseignants = () => {
    enseignantsservice
      .GetALL()
      .then((res) => {
        console.log("Enseignant", res.data.data);
        setEnseignant(res.data.data);
        setEnseig(res.data.data);
        setAffiche(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllEnseignants();
  }, []);
  const getAllSalles = () => {
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
    getAllSalles();
  }, []);
  const getAllSeances = () => {
    seanceservice
      .GetALL()
      .then((res) => {
        console.log(res);
        setSeance(res.data.data);
        setAffiche(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllSeances();
  }, []);

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
        <Outlet></Outlet>
        {/* Widgets End */}
        <div>
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-6 col-xl-3">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-line fa-3x text-primary" />
                  <div className="ms-3">
                    <p className="mb-2">Nos Etudiants</p>
                    <h6 className="mb-0">{etudiants?.length}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-bar fa-3x text-primary" />
                  <div className="ms-3">
                    <p className="mb-2">Nos Enseignants</p>
                    <h6 className="mb-0">{enseignant?.length}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-area fa-3x text-primary" />
                  <div className="ms-3">
                    <p className="mb-2">Salles</p>
                    <h6 className="mb-0">{salles?.length}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-pie fa-3x text-primary" />
                  <div className="ms-3">
                    <p className="mb-2">Seances</p>
                    <h6 className="mb-0">{seance?.length}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
       

        
        {/*
 
        <Footer></Footer>
        {/* Footer End */}
      </div>
      {/* Content End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top" id="j">
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
};
export default Acceuil;