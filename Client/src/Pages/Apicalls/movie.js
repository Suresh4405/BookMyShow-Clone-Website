import { axiosinstance } from  "./index"


export const Addmovie=async(payload)=>{


    try {
        const response= await axiosinstance.post("http://localhost:7776/movie/add-movie",payload)
        return response.data

    } catch (error) {
        
        return error
    }

}

export const GetAllMovies =async()=>{

    try {
        const response =await axiosinstance.get("http://localhost:7776/movie/get-movie")
        return response.data
        
    } catch (error) {
        
        
        return error
    }
}

export const Deletemovie =async(id)=>{

    try {
        const response =await axiosinstance.post("http://localhost:7776/movie/delete-movie",id)
        return response.data
        
    } catch (error) {
        
        return error
    }
}


export const UpdateMovieList =async(payload)=>{

    try {
        const response=await axiosinstance.post("http://localhost:7776/movie/Edit-movie",payload)
        return response.data

    } catch (error) {
        return error
    }
} 


// get particular Id


export const GetMovieById = async (id) => {
    try {
        const response = await axiosinstance.get(`http://localhost:7776/movie/get-movie-by-id/${id}`)
  
        return response.data;
        
    } catch (error) {
        return error.response;
    }
  }
