import React, { useEffect, useState } from 'react';
import presences from '../services/presences';
import { useParams } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import Sidebar from '../components/sidebar';


const PageEtudiant = () => {
    const [list, setList] = useState([]);
    const { id } = useParams();


    useEffect(() => {
        const getList = async () => {
            try {
                const response = await presences.getPresenceByEtudiant(id);
                setList(response.data.data);
            } catch (error) {
                console.error('Error fetching presence data:', error);
                // Handle error (e.g., display error message to the user)
            }
        };
        getList();
    }, [id]);

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
                                <th scope="col">Etat</th>
                                <th scope="col">Moyenne</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.IdSeance.DateSc}</td>
                                    <td>{item.IdSeance.IdMatiere.NomMatiere}</td>
                                    <td>{item.Etat.toString()}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
    );
};

export default PageEtudiant;
