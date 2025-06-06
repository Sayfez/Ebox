import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/authService';
import userService from '../services/userService';


const Sidebar = () => {
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('Iduser'));
  const [user, setUser] = useState({})
//design :
const getUserById = () => {
  const userId = localStorage.getItem('Iduser');
  if (userId) {
    userService.GetById(userId)
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('No user ID found in local storage.');
  }
};

  useEffect(() => {
  
    const role = authService.getUserRole();
    setUserRole(role);
   // const currentUser = authService.getCurrentUser();
    /*if (currentUser) {
      setUserId(currentUser._id); // Assuming the user ID is stored in _id
    }*/
      getUserById();
      console.log('user image',user)
  }, []);
  return (
    <div className="sidebar pe-4 pb-3">
    <nav className="navbar bg-light navbar-light">
      <a href="index.html" className="navbar-brand mx-4 mb-3">
      <img className="rounded-circle" src="img/logo.png" alt style={{width: 200, height: 200}} />
      </a>
      <div className="d-flex align-items-center ms-4 mb-4">
        <div className="position-relative">
          <img className="rounded-circle" src={`http://localhost:3003/upload/users/${user.Photo}`} alt style={{width: 40, height: 40}} />
          <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
        </div>
        <div className="ms-3">
          <h6 className="mb-0">Profil :</h6>
          <span className="d-none d-lg-inline-flex">{userRole}</span>
        </div>
      </div>
      <div className="navbar-nav w-100">
      {['admin'].includes(userRole) && (
        <>
        </>
          )}
        
        {userRole === 'admin' && (
            <>
         <Link to="/" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
        <Link to="/classlist" className="nav-item nav-link"><i className="fa fa-table me-2" />Classes</Link>
        <Link to="/listeMatieres" className="nav-item nav-link"><i className="fa fa-table me-2" />Matières</Link>
        <Link to="/ajouterseance" className="nav-item nav-link"><i className="fa fa-table me-2" />Plannifier une séance</Link>
        <Link to="/ajouteruser" className="nav-item nav-link"><i className="fa fa-table me-2" />Ajouter un utilisateur</Link>
     
        <Link to="/enseignantlist" className="nav-item nav-link"><i className="fa fa-table me-2" />Listes des enseignants</Link>
        <Link to="/reclamations" className="nav-item nav-link"><i className="fa fa-table me-2" />Réclamations</Link>
        
        
        </>
          )}
        {userRole === 'etudiant' && (
            <>
                    <Link to="/acceuil" className="nav-item nav-link"><i className="fa fa-table me-2" />Acceuil</Link>
        <Link to={`/pageEtudiant/${userId}`} className="nav-item nav-link"><i className="fa fa-table me-2" />Consulter mes présences</Link>
        <li><Link to={"/reclamer"} className="nav-item nav-link"><i className="fa fa-table me-2" />Réclamation</Link></li>
        </>
      )}
          {userRole === 'enseignant' && (
            <>      <Link to="/acceuil" className="nav-item nav-link"><i className="fa fa-table me-2" />Acceuil</Link>
         <li><Link to={`/pageEnseignant/${userId}`} className="nav-item nav-link"><i className="fa fa-table me-2" />Mes présences</Link></li>
         <li><Link to={"/reclamer"} className="nav-item nav-link"><i className="fa fa-table me-2" />Réclamation</Link></li>
         <li><Link to={`/seancesofenseignant/${userId}`} className="nav-item nav-link"><i className="fa fa-table me-2" />Mes Séances</Link></li>
        </>

      )}

      
      
      </div>
    </nav>
  </div>
  )
}

export default Sidebar