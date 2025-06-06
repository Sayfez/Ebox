import http from "./axioscontext"

const Create=(data)=>{
    return http.post("/etudiants",data)
}
const GetALL=()=>{
    return http.get("/etudiants")
}
const Update=(id,data)=>{
    return http.put(`/etudiants/${id}`,data)
}
const GetById=(id)=>{
    return http.get(`/etudiants/${id}`)
}
const DeleteOne=(id)=>{
    return http.delete(`/etudiants/${id}`)
}
const GetStudents=(id)=>{
    return http.get(`/etudiants/getetudiants/${id}`)
}

 
export default{Create,GetALL,Update,GetById,DeleteOne,GetStudents}