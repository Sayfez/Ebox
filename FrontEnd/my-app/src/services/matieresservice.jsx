import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/matieres",data)
}
const GetALL=()=>{
    return http.get("/matieres")
}
const Update=(id,data)=>{
    return http.put(`/matieres/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/matieres/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/matieres/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne}