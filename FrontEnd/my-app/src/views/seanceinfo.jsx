// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import presencesservice from '../services/presences'; // Adjust the import path if needed
// import Sidebar from '../components/sidebar';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import Swal from 'sweetalert2';
// import etudiantsservice from '../services/etudiantsservice';
// import axios from 'axios';

// const SeanceInfo = () => {
//   const { id } = useParams();
//   const [presences, setPresences] = useState([]);
//   const [affiche, setAffiche] = useState(false);
//   const [marks, setMarks] = useState({});

//   const getList = async () => {
//     try {
//       const res = await etudiantsservice.GetStudents("666ad80cae6a78012aba2e26");
//       setPresences(res.data.data);
//       console.log(res.data.data)
//       setAffiche(true);
//     } catch (error) {
//       console.error('Error fetching presences:', error);
//     }
//   };


// const [newData,setNewData]=useState([])
//   const newList=()=>{
//     axios.get("http://localhost:3003/presences/seances/66848cc2c7b63c01fbb80640").then((res)=>{
//       console.log("ressssssssseeeeeeee",res.data)
//       setNewData(res.data)
//     }).catch((err)=>{
//       console.log(err)
//     })
//   }



//   useEffect(() => {
//     newList()
//     getList();
//   }, [id]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const updateEtat = (id) => {
//     Swal.fire({
//       title: "Do you want to change the state?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: `Don't save`
//     }).then((result) => {
//       if (result.isConfirmed) {
//         presencesservice.updateEtat(id).then((res) => {
//           console.log(res);
//           getList();
//         }).catch((err) => {
//           console.log(err);
//         });
//         Swal.fire("Saved!", "", "success");
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   };

//   const handleMarkChange = (e, id) => {
//     setMarks({
//       ...marks,
//       [id]: e.target.value
//     });
//   };

//   const saveMark = async (id) => {
//     try {
//       const mark = marks[id];
//       await presencesservice.updateMark(id, mark);
//       Swal.fire("Saved!", "Mark has been saved.", "success");
//       getList();
//     } catch (error) {
//       console.error('Error saving mark:', error);
//       Swal.fire("Error", "Could not save the mark.", "error");
//     }
//   };

//   if (!affiche) {
//     return <div>Loading...</div>;
//   }








//   return (
//     <div className="container-xxl position-relative bg-white d-flex p-0">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Content */}
//       <div className="content">
//         {/* Header */}
//         <Header />

//         {/* Main Content */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="bg-light text-center rounded p-4">
//             <div className="d-flex align-items-center justify-content-between mb-4">
//               <h6 className="mb-0">Liste des Présences</h6>
//               <div>
//                 <button className="btn btn-sm btn-danger" onClick={handlePrint}>
//                   Imprimer
//                 </button>
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table text-start align-middle table-bordered table-hover mb-0">
//                 <thead>
//                   <tr className="text-dark">
//                     <th scope="col">Étudiant</th>
//                     <th scope="col">État</th>

//                     <th scope="col">Date de modification</th>
//                     <th scope="col">Action</th>
//                     <th scope="col">Note CC</th>
//                     <th scope="col">Moyenne</th>
//                   </tr>
//                 </thead>
//             <tbody>
//                   {presences?.map((presence) => (
//                     <tr key={presence._id}>
//                       <td>{presence.FamilyName} {presence.Name}</td>

//                        <td> 

//                        {newData?.map((i,index)=>{
//                       return (
//                         <p key={index}>{i?.Etat ? i.Etat.toString() : "Absent"}</p>

//                       )
//                     })}
//                        </td>
//                       <td>{new Date(presence.updatedAt).toLocaleString()}</td>
//                       <td>
//                         <button className="btn btn-sm btn-primary" onClick={() => updateEtat(presence._id)}>
//                           Modifier l'état
//                         </button>
//                       </td>
//                       <td>
//                         <input

//                           type="number"
//                           value={marks[presence._id] || ''}
//                           onChange={(e) => handleMarkChange(e, presence._id)}
//                           style={{ width: '70px', marginRight: '10px' }}
//                         />
//                         <button s className="btn btn-sm btn-primary" onClick={() => saveMark(presence._id)}>
//                           Save
//                         </button>
//                       </td>
//                       <td>{presence.mark}</td>
//                     </tr>
//                   ))}
//                 </tbody> 







//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>

//       {/* Back to Top Button */}
//       <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
//         <i className="bi bi-arrow-up" />
//       </a>
//     </div>
//   );
// };

// export default SeanceInfo;





















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Sidebar from '../components/sidebar';
// import Header from '../components/header';
// import Footer from '../components/footer';
// import Swal from 'sweetalert2';
// import etudiantsservice from '../services/etudiantsservice';
// import etatService from './etatService'; // Importer le service d'état
// import presencesservice from '../services/presences';
// const SeanceInfo = () => {
//   const { id } = useParams();
//   const [presences, setPresences] = useState([]);
//   const [affiche, setAffiche] = useState(false);
//   const [marks, setMarks] = useState({});
//   const [etatData, setEtatData] = useState({});

//   const getList = async () => {
//     try {
//       const sessionRes = await etudiantsservice.GetALL();
//       console.log('sessionRes', sessionRes.data.data)
//       const app = sessionRes.data.data.map((i) => {
//         return { idClasse: i.IdClasse };
//       });
//       const randomIndex = Math.floor(Math.random() * 14);
//       console.log("randomIndexv", randomIndex)
//       const newww = app[randomIndex].idClasse
//       const res = await etudiantsservice.GetStudents(newww);
//       const students = res.data.data;
//       setPresences(students);
//       setAffiche(true);
//       const etatMap = await etatService.getEtatsForStudents(students);
//       setEtatData(etatMap);
//     } catch (error) {
//       console.error('Error fetching presences:', error);
//     }
//   };
//   useEffect(() => {
//     getList();
//   }, [id]);

//   const handlePrint = () => {
//     window.print();
//   };

//   const updateEtat = (id) => {
//     Swal.fire({
//       title: "Do you want to change the state?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: `Don't save`
//     }).then((result) => {
//       if (result.isConfirmed) {
//         presencesservice.updateEtat(id).then((res) => {
//           console.log(res);
//           getList();
//         }).catch((err) => {
//           console.log(err);
//         });
//         Swal.fire("Saved!", "", "success");
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   };

//   const handleMarkChange = (e, id) => {
//     setMarks({
//       ...marks,
//       [id]: e.target.value
//     });
//   };

//   const saveMark = async (id) => {
//     try {
//       const mark = marks[id];
//       await presencesservice.updateMark(id, mark);
//       Swal.fire("Saved!", "Mark has been saved.", "success");
//       getList();
//     } catch (error) {
//       console.error('Error saving mark:', error);
//       Swal.fire("Error", "Could not save the mark.", "error");
//     }
//   };

//   if (!affiche) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container-xxl position-relative bg-white d-flex p-0">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Content */}
//       <div className="content">
//         {/* Header */}
//         <Header />

//         {/* Main Content */}
//         <div className="container-fluid pt-4 px-4">
//           <div className="bg-light text-center rounded p-4">
//             <div className="d-flex align-items-center justify-content-between mb-4">
//               <h6 className="mb-0">Liste des Présences</h6>
//               <div>
//                 <button className="btn btn-sm btn-danger" onClick={handlePrint}>
//                   Imprimer
//                 </button>
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table text-start align-middle table-bordered table-hover mb-0">
//                 <thead>
//                   <tr className="text-dark">
//                     <th scope="col">Étudiant</th>
//                     <th scope="col">État</th>
//                     <th scope="col">Date de modification</th>
//                     <th scope="col">Action</th>
//                     <th scope="col">Note CC</th>
//                     <th scope="col">Moyenne</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {presences?.map((presence) => (
//                     <tr key={presence._id}>
//                       <td>{presence.FamilyName} {presence.Name}</td>
//                       <td>{etatData[presence._id] || "Loading..."}</td>  
//                       <td>{new Date(presence.updatedAt).toLocaleString()}</td>
//                       <td>
//                         <button className="btn btn-sm btn-primary" onClick={() => updateEtat(presence._id)}>
//                           Modifier l'état
//                         </button>
//                       </td>

//                       <td>
//                         <input
//                           type="number"
//                           value={marks[presence._id] || ''}
//                           onChange={(e) => handleMarkChange(e, presence._id)}
//                           style={{ width: '70px', marginRight: '10px' }}
//                         />
//                         <button className="btn btn-sm btn-primary" onClick={() => saveMark(presence._id)}>
//                           Save
//                         </button>
//                       </td>
//                       <td>{presence.mark}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>

//       {/* Back to Top Button */}
//       <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
//         <i className="bi bi-arrow-up" />
//       </a>
//     </div>
//   );
// };

// export default SeanceInfo;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import Swal from 'sweetalert2';
import etudiantsservice from '../services/etudiantsservice';
import etatService from './etatService'; // Adjusted import path
import presencesservice from '../services/presences';
import axios from 'axios';

const SeanceInfo = () => {
  const { id } = useParams();
  const [presences, setPresences] = useState([]);
  const [affiche, setAffiche] = useState(false);
  const [marks, setMarks] = useState({});
  const [etatData, setEtatData] = useState({});
  const [error, setError] = useState('');
  const [moyenneData, setMoyenneData] = useState({});

  const getList = async () => {
    try {
      const sessionRes = await etudiantsservice.GetALL();
      const app = sessionRes.data.data.map((i) => ({ idClasse: i.IdClasse }));
      const randomIndex = Math.floor(Math.random() * app.length);
      const newww = app[randomIndex].idClasse;

      const res = await etudiantsservice.GetStudents(newww);
      const students = res.data.data;
      console.log("Fetched students:", students);
      setPresences(students);
      setAffiche(true);

      // Extract valid student IDs and fetch their state
      const studentIds = students.map(student => student._id).filter(id => id);
      console.log("Student IDs:", studentIds);

      const etatMap = await etatService.getEtatsForStudents(studentIds);
      console.log("Etat map for students:", etatMap);

      // Filter out invalid entries
      const validEtatMap = Object.keys(etatMap).reduce((acc, key) => {
        if (key !== "undefined" && key) {
          acc[key] = etatMap[key];
        }
        return acc;
      }, {});

      setEtatData(validEtatMap);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire("Error", "Could not fetch data.", "error");
    }
  };

  useEffect(() => {
    getList();
  }, [id]);

  const handleMarkChange = (e, id) => {
    setMarks({
      ...marks,
      [id]: e.target.value
    });
  };

  const handleUpdateNoteCC = async (presenceId) => {

    const parsedValue = parseFloat(marks[presenceId] || 0);
    if (isNaN(parsedValue) || parsedValue < 0) {
      setError('Invalid Note CC value. It must be a non-negative number.');
      return;
    }
    try {
       const res = await axios.patch(`http://localhost:3003/presences/6672d37aebcec43ba7e56133/noteCc`, { noteCc: parsedValue });
      Swal.fire('Success!', 'Note CC has been updated.', 'success');
      setError('');
      setPresences(prevPresences => prevPresences.map(presence =>
        presence._id === presenceId ? { ...presence, noteCc: parsedValue, Moyenne: res.data.Moyenne } : presence
      ));
      setMoyenneData(prevState => ({
        ...prevState,
        [presenceId]: res.data.Moyenne
      }));
    } catch (error) {
      console.error('Error updating Note CC:', error);
      Swal.fire('Error', 'Failed to update Note CC.', 'error');
    }
  };

  // Define the handleFetchPresenceData function
  const handleFetchPresenceData = async (presenceId) => {
    try {
      const res = await axios.get(`http://localhost:3003/presences/PresenceEtudiant/${presenceId}`);
      console.log('Fetched data:', res.data);
      Swal.fire('Mail Sended !', 'The Mail has been successfully sended to the student.', 'success');
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data and send email.', 'error');
    }
  };

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
              <h6 className="mb-0">Liste des Présences</h6>
              <div>
                <button className="btn btn-sm btn-danger" onClick={() => window.print()}>
                  Imprimer
                </button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-dark">
                    <th scope="col">Étudiant</th>
                    <th scope="col">État</th>
                    <th scope="col">Date de modification</th>
                    <th scope="col">Note CC</th>
                    <th scope="col">Moyenne</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {presences.map((presence) => (
                    <tr key={presence._id}>
                      <td>{presence.FamilyName} {presence.Name}</td>
                      <td>{etatData[presence._id] || "Loading..."}</td>
                      <td>{new Date(presence.updatedAt).toLocaleString()}</td>
                      <td>
                        <input
                          type="number"
                          name='noteCc'
                          value={marks[presence._id] || ''}
                          onChange={(e) => handleMarkChange(e, presence._id)}
                          placeholder="Enter Note CC"
                          style={{ width: '150px', marginRight: '10px' }}
                        />
                        <button onClick={() => handleUpdateNoteCC(presence._id)} className="btn btn-sm btn-primary">
                          Update Note CC
                        </button>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                      </td>
                      <td>{moyenneData[presence._id] || "0"} </td>
                      <td>
                        <button className="btn btn-sm btn-success" onClick={() => handleFetchPresenceData(presence._id)}>
                          Send Mail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
    </div>
  );
};

export default SeanceInfo;



