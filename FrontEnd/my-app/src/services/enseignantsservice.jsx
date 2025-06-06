import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/enseignants",data)
}
const GetALL=()=>{
    return http.get("/enseignants")
}
const Update=(id,data)=>{
    return http.put(`/enseignants/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/enseignants/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/enseignants/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne}
