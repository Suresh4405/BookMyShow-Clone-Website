import axios from "axios"


export const axiosinstance= axios.create({
    
headers:{
    credentials:"include",
    method:"post",
    "Content-Type":"application/json",
    authorization:`Bearer ${localStorage.getItem("token")}`
}

})