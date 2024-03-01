import { axiosinstance } from "./index";


export const AdddTheatre = async (payload) => {
    try {
      const response = await axiosinstance.post(
        "http://localhost:7776/theatre/add-theatre",
        payload
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  export const UpdateTheatre = async (payload) => {
    try {
      const response = await axiosinstance.post(
        "http://localhost:7776/theatre/update-theatre",
        payload
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  

export const DeleteTheatre = async (id) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:7776/theatre/delete-theater",id
      
    );
    return response.data;
  } catch (err) {
    return err;
  }
};



  export const GetAllTheatresByOwner = async (payload) => {
    console.log(payload,"sfsfsfsfsfdasasasadasasadaddss");
    try {
      const response = await axiosinstance.post(
        "http://localhost:7776/theatre/get-all-theatre-by-owner",
        payload
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  export const GetAllTheatres = async () => {
    try {
      const response = await axiosinstance.get(
        "http://localhost:7776/theatre/get-all-theatre",
        
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };



// Shows.........................................

export const GetAllShowsByTheatre = async (payload) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:7776/theatre/get-all-shows-by-theatre",payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};




  export const AddShow= async (payload) => {
    try {
      const response = await axiosinstance.post(
        "http://localhost:7776/theatre/add-shows",
        payload
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };




  export const Deleteshows = async (id) => {
    try {
      const response = await axiosinstance.post(
        "http://localhost:7776/theatre/delete-shows",id
        
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };
  

  
  export const GetAllTheatresByMovie =  async(payload) =>{
    try{

      const response = await axiosinstance.post(
        "http://localhost:7776/theatre/get-all-theatre-by-movie",
        payload
      );
      return response.data;

    }catch(err){
      return err;
 
    }

  }