import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/presences",data)
}
const GetALL=()=>{
    return http.get("/presences")
}
const Update=(id,data)=>{
    return http.put(`/presences/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/presences/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/presences/${id}`)
}
const getPresenceByEtudiant=(id)=>{
    return http.get(`/presences/PresenceEtudiant/${id}`)
}

const getPresenceByEnseignant=(id)=>{
    return http.get(`/presences/profpercent/${id}`)
}

const getPresenceBySubject=(id)=>{
    return http.get(`/presences/mpercent`)
}
const getPresenceByClass=(id)=>{
    return http.get(`/presences/cpercent/${id}`)
}
const updateEtat=(id)=>{
    return http.get(`/presences/updateEtat/${id}`)
}
//
const findPresencesBySeanceId=(id)=>{
    return http.get(`/presences/seances/${id}`)
}
const updateMark=(id,mark)=>{
    return http.patch(`/presences/${id}/mark`,{mark})
}

const calculeMoyenne=(id,data)=>{
    return http.patch(`/presences/${id}/noteCc`,data)
}
 
export default{ calculeMoyenne,Create,GetALL,Update,GetById,DeleteOne,getPresenceByEtudiant,getPresenceByEnseignant,getPresenceBySubject,getPresenceByClass,updateEtat,findPresencesBySeanceId,updateMark}