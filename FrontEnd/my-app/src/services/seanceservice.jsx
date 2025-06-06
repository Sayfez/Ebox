import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/seances",data)
}
const GetALL=()=>{
    return http.get("/seances")
}
const Update=(id,data)=>{
    return http.put(`/seances/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/seances/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/seances/${id}`)
}
const getSeancesByEnseignant=(id)=>{
    return http.get(`/seances/enseignant/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne,getSeancesByEnseignant}