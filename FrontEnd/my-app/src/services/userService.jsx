import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/users",data)
}
const GetALL=()=>{
    return http.get("/users")
}
const Update=(id,data)=>{
    return http.put(`/users/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/users/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/users/${id}`)
}
export default{Create,GetALL,Update,GetById,DeleteOne}