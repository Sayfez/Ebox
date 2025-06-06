import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/presenceEnseignants",data)
}
const GetALL=()=>{
    return http.get("/presenceEnseignants")
}
const Update=(id,data)=>{
    return http.put(`/presenceEnseignants/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/presenceEnseignants/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/presenceEnseignants/${id}`)
}
const getPresenceByEnseignant=(id)=>{
    return http.get(`/presenceEnseignants/presenceEnseignant/${id}`)
}
const updateState=(id)=>{
    return http.get(`/presenceEnseignants/updateState/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne,getPresenceByEnseignant,updateState}