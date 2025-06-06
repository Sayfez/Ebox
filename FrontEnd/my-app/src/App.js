
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import authService from './services/authService';
import Home from './views/home';
import Classes from './views/classes';
import ListStudentsbyClasse from './views/listStudentsbyClasse';
import Ajouterclasse from './views/ajouterclasse';
import Ajouteretudiant from './views/ajouteretudiant';
import Ajouterenseignant from './views/ajouterenseignant';
import ListAbsencebyStudent from './views/listeAbsencebyStudent';
import Ajouteruser from './views/ajouteruser';
import Login from './views/login';
import Enseignants from './views/enseignants';
import Ajouterseance from './views/ajouterseance';
import ListAbsencebyEnseignant from './views/listAbsencebyEnseignant';
import Ajoutermatiere from './views/ajoutermatiere';
import SignUp from './views/Signup';
import PageClassesEnseignant from './views/pageClassesEnseignant';
import PageEtudiant from './views/pageEtudiant';
import PageEnseignant from './views/pageEnseignant';
import Reclamer from './views/reclamer';
import Reclamations from './views/reclamations';
import UserReclamation from './views/userReclamation';
import ListeMatieres from './views/listeMatieres';
import SeancesOfEnseignant from './views/seancesofenseignant';
import SeanceInfo from './views/seanceinfo';
import Acceuil from './views/acceuil';
//

// Function to decode the token and extract user ID
function getUserIdFromToken() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const tokenParts = accessToken.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload.userId; // Assume your token has a field called userId
    }
  }
  return null; // Return null if the token is invalid or missing information
}

const App = () => {
  const userId = getUserIdFromToken();

  // Component to protect routes based on roles
  const RoleBasedPrivateRoute = ({ children, roles }) => {
    const role = authService.getUserRole();
    if (!authService.isLoggedIn()) {
      return <Navigate to="/login" />;
    }
    if (roles && !roles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

         

          <Route
            path='/'
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant', 'etudiant']}>
                <Home />
              </RoleBasedPrivateRoute>
            }
          />
            <Route
            path='/acceuil'
            element={
              <RoleBasedPrivateRoute roles={['enseignant', 'etudiant']}>
                <Acceuil />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/classlist'
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <Classes />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/liststudentbyclasse/:id'
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <ListStudentsbyClasse />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/listabsencebystudent/:id'
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <ListAbsencebyStudent />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/listpresenceEnseignant/:id'
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <ListAbsencebyEnseignant />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/ajouterclasse'
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <Ajouterclasse />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/ajouteretudiant'
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <Ajouteretudiant />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/ajouterenseignant'
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <Ajouterenseignant />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/ajoutermatiere'
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <Ajoutermatiere />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/ajouteruser'
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <Ajouteruser />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/ajouterseance'
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <Ajouterseance />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path='/enseignantlist'
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <Enseignants />
              </RoleBasedPrivateRoute>
            }
          />

          <Route
            path="/pageEtudiant/:id"
            element={
              <RoleBasedPrivateRoute roles={['etudiant']}>
                <PageEtudiant />
              </RoleBasedPrivateRoute>
            }
          />

          <Route
            path="/pageEnseignant/:id"
            element={
              <RoleBasedPrivateRoute roles={['enseignant']}>
                <PageEnseignant />
              </RoleBasedPrivateRoute>
            }
          />

          <Route
            path="/pageClassesEnseignant/"
            element={
              <RoleBasedPrivateRoute roles={['enseignant']}>
                <PageClassesEnseignant />
              </RoleBasedPrivateRoute>
            }
          />
          <Route
            path="/reclamer/"
            element={
              <RoleBasedPrivateRoute roles={['etudiant', 'enseignant']}>
                <Reclamer />
              </RoleBasedPrivateRoute>
            }
          />

          <Route
            path="/reclamations"
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <Reclamations />
              </RoleBasedPrivateRoute>
            }
          />

<Route
            path="/userReclamation/:id"
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <UserReclamation />
              </RoleBasedPrivateRoute>
            }
          />

<Route
            path="/listeMatieres"
            element={
              <RoleBasedPrivateRoute roles={['admin']}>
                <ListeMatieres />
              </RoleBasedPrivateRoute>
            }
          />

<Route
            path="/seancesofenseignant/:id"
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <SeancesOfEnseignant />
              </RoleBasedPrivateRoute>
            }
          />

        <Route
            path="/seanceinfo/:id"
            element={
              <RoleBasedPrivateRoute roles={['admin', 'enseignant']}>
                <SeanceInfo />
              </RoleBasedPrivateRoute>
            }
          />

        </Routes>

      </Router>
    </div>
  );
}

export default App;

