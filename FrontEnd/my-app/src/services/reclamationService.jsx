import http from "./axioscontext"

const Create=(data)=>{
    return http.post(`/reclamations/${localStorage.getItem('Iduser')}`,data)
}
const GetALL=()=>{
    return http.get("/reclamations")
}
const Update=(id,data)=>{
    return http.put(`/reclamations/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/reclamations/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/reclamations/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne}