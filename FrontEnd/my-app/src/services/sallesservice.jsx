import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/salles",data)
}
const GetALL=()=>{
    return http.get("/salles")
}
const Update=(id,data)=>{
    return http.put(`/salles/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/salles/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/salles/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne}