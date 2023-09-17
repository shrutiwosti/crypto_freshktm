import axios from "axios";

//using moment.js ibrary for converting UTC time to date/time format
import moment from 'moment';

//setting Authorization header for all requests
axios.defaults.headers.common['Authorization'] = "Bearer " + process.env.API_KEY;

export const getAssetData = async() =>{
    try{
       const res=  await axios.get("https://api.coincap.io/v2/assets?limit=50")
       const data = res?.data.data
       
        return {
            data,
            success:true
        }

    }
    catch(error){
        return {
            error,
            success:false
        } 
    }
}

export const getAssetDataById = async(id) =>{
    try{
       const res=  await axios.get(`https://api.coincap.io/v2/assets/${id}`)
       const data = res?.data.data
        return {
            data,
            success:true
        }

    }
    catch(error){
        return {
            error,
            success:false
        } 
    }
}

export const getAssetDataHistory = async(id,time) =>{

    try{
       const res=  await axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=${time}`)
       const data = res?.data.data
       
        
       const updatedData = data.map((assets => {
        if(time === "h1"){
            //converting utc to date and time formats and sending updated data as response
            return {...assets,date: assets.date = moment(assets.date).utc().format("ddd hh:mm a" )}

        }
        else{
            return {...assets,date: assets.date = moment(assets.date).utc().format("YYYY/MM/DD")}

        }
        }))
        return {
            data:updatedData,
            success:true
        }
    }
    catch(error){
        return {
            error,
            success:false
        } 
    }
}

export const getAssetDataBySearch = async(search) =>{

    try{
       const res=  await axios.get(`https://api.coincap.io/v2/assets/?search=${search}`)
       const data = res?.data.data

       const updatedData = data.filter((item) =>
       {
            if(item.rank <= 50){
                return item
            };
       });

       
        return {
            data:updatedData,
            success:true
        }
    }
    catch(error){
        return {
            error,
            success:false
        } 
    }
}