import React, { useEffect, useState } from 'react'

const ChartStat = () => {
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

    fetchMatieres();
  }, []);
  useEffect(() => {
    const fetchDataForMatieres= async () => {
      try {
        const results = await Promise.all(
          matieres.map(async (matiere) => {
            try {
              const response = await axios.get(
                `http://localhost:3003/Presences/mpercent/${matiere._id}`
              );
              console.log("matiere stat",response)
              // Vérifier si la réponse est valide avant de calculer le résultat
              if (response.status === 200 && response.data.data !== null) {
                return (response.data.data  )  ;
              } else {
                return null; // Retourner null si les données ne sont pas valides
              }
            } catch (error) {
              console.error(`Error fetching data for matiere ${matiere._id}:`, error);
              return null; // Retourner null en cas d'erreur lors de la requête
            }
          })
        );
  
        setChartData1(results.filter(result => result !== null));
      } catch (error) {
        console.error("Error fetching data for matiere:", error);
        // Afficher un message d'erreur à l'utilisateur ou gérer l'erreur d'une autre manière
      }
    };
  
    if (matieres.length > 0) {
      fetchDataForMatieres();
    }
  }, [matieres]);
  
  
 
  const [chartData1, setChartData1] = useState([]);
  const data1 = {
    labels: matieres
      .filter((matiere) => chartData1[matieres.indexOf(matiere)] !== null)
      .map((matiere) => `${matiere.Name} ${matiere.NomMatiere}`),
    datasets: [
      {
        label: "Pourcentage de présence",
        data: chartData1.filter((data1) => data1 !== null),
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

  return (
    
    <div>ChartStat</div>
  )
}

export default ChartStat