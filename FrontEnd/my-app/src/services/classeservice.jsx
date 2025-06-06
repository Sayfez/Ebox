import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/classe",data)
}
const GetALL=()=>{
    return http.get("/classe")
}
const Update=(id,data)=>{
    return http.put(`/classe/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/classe/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/classe/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne}
