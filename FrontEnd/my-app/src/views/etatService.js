import axios from 'axios';

const getEtatForStudent = async (studentId) => {
  try {
    console.log("Fetching state for studentId:", studentId);
    const res = await axios.get(`http://localhost:3003/presences/PresenceEtudiant/${studentId}`);
    
    const presenceData = res.data.data;
    if (!presenceData || presenceData.length === 0) {
      return { id: studentId, etat: "Absent" };
    }

    const app = presenceData.map(i => ({ etat: i.Etat ? "Présent" : "Absent" }));
    const randomIndex = Math.floor(Math.random() * app.length);

    return {
      id: studentId,
      etat: app[randomIndex].etat
    };
  } catch (err) {
    console.error(`Error fetching student state for studentId ${studentId}:`, err.message);
    return {
      id: studentId,
      etat: "Absent"
    };
  }
};

const getEtatsForStudents = async (students) => {
  try {
    const etatPromises = students.map(student => getEtatForStudent(student));
    const etatResults = await Promise.all(etatPromises);

    const etatMap = etatResults.reduce((acc, curr) => {
      acc[curr.id] = curr.etat;
      return acc;
    }, {});

    console.log("Etat map for students:", etatMap);
    return etatMap;
  } catch (err) {
    console.error("Error fetching etats for students:", err.message);
    return {};
  }
};

export default { getEtatForStudent, getEtatsForStudents };
