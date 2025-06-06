 
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
const Home = () => {
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

 
  const [enseignants, setEnseignants] = useState([]);

  useEffect(() => {
    const fetchEnseignants = async () => {
      try {
        const response = await enseignantsservice.GetALL();
        setEnseignants(response.data.data);
      } catch (error) {
        console.error("Error fetching enseignants:", error);
      }
    };

    fetchEnseignants();
  }, []);
  useEffect(() => {
    const fetchDataForEnseignants = async () => {
      try {
        const results = await Promise.all(
          enseignants.map(async (enseignant) => {
            try {
              const response = await axios.get(
                `http://localhost:3003/Presences/profpercent/${enseignant._id}`
              );
              // Vérifier si la réponse est valide avant de calculer le résultat
              if (response.status === 200 && response.data.data !== null) {
               /*  return (response.data.data / 1000) * 100; */
               return (response.data.data  ) ;
              } else {
                return null; // Retourner null si les données ne sont pas valides
              }
            } catch (error) {
              console.error(`Error fetching data for enseignant ${enseignant._id}:`, error);
              return null; // Retourner null en cas d'erreur lors de la requête
            }
          })
        );
  
        setChartData(results.filter(result => result !== null));
      } catch (error) {
        console.error("Error fetching data for enseignants:", error);
        // Afficher un message d'erreur à l'utilisateur ou gérer l'erreur d'une autre manière
      }
    };
  
    if (enseignants.length > 0) {
      fetchDataForEnseignants();
    }
  }, [enseignants]);
  
  
 
  const [chartData, setChartData] = useState([]);
  const dataa = {
    labels: enseignants
      .filter((enseignant) => chartData[enseignants.indexOf(enseignant)] !== null)
      .map((enseignant) => `${enseignant.Name} ${enseignant.FamilyName}`),
    datasets: [
      {
        label: "Pourcentage de présence",
        data: chartData.filter((data) => data !== null),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(155, 105, 56)",
         ],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };
  
 
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };



const role = localStorage.getItem("role")
 
  const [matieres, setMatiere] = useState([]);

  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const response = await matieresservice.GetALL();
        setMatiere(response.data.data);
        console.log("matieres:",matieres)
      } catch (error) {
        console.error("Error fetching matiere:", error);
      }
    };
//////////////
/////////////

////////////
///////////

    fetchMatieres();
  }, []);
  const [chartData1, setChartData1] = useState([]);

  useEffect(() => {
  // Exemple de traitement de la réponse si response.data.data est un tableau
const fetchDataForMatieres = async () => {
  try {
    const results = await Promise.all(
      matieres.map(async (matiere) => {
        try {
          const response = await axios.get(
            `http://localhost:3003/Presences/mpercent/${matiere._id}`
          );

          // Assurez-vous que response.data.data est bien un tableau
          const data = response.data.data;
          console.log('response::: ', data);

          // Vérifiez que la réponse contient bien des données et qu'elles sont valides
          if (Array.isArray(data) && data.length > 0) {
            // Vous pouvez parcourir chaque élément pour obtenir les pourcentages
            const pourcentages = data.map(item => item.pourcentage);
            console.log('Pourcentages: ', pourcentages);
           // console.log('idmatiere: ', data.map(item => item.matiere.NomMatiere));

            // Retournez un tableau de pourcentages, par exemple
            return pourcentages;
          } else {
            return null;
          }
        } catch (error) {
          console.error(`Error fetching data for matiere ${matiere._id}:`, error);
          return null; // Retournez null en cas d'erreur
        }
      })
    );

    // Filtrez les résultats nuls et mettez à jour les données du graphique
    const filteredResults = results.filter((result) => result !== null);
    setChartData1(filteredResults);
  } catch (error) {
    console.error('Error fetching data for matiere:', error);
  }
};

  
    if (matieres.length > 0) {
      fetchDataForMatieres();
    }
  }, [matieres]);
  const test= chartData1.map((item) => item.percentage)
  console.log("yess",chartData1[0])
  const data1 = {
    labels: chartData1.map((item) => item.label),
    datasets: [
      {
        label: 'Pourcentage de présence',
 
        data: chartData1[0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(155, 105, 56)',
        ],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };
  
  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Assuming you are working with percentages
      },
    },
  };


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
        {role === "admin"?(
          <>
                  <Bar data={dataa} options={options} />
                  <div>
                  <div style={{ height: '400px', width: '100%' }}>
    {chartData1.length > 0 ? (
      <Doughnut data={data1} options={options} />
    ) : (
      <p>No data available for chart</p>
    )}
  </div>
    </div>
                </>
       
        ):(
          <p></p>
        )}

        
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
export default Home;