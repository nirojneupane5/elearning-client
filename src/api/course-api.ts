import axios from "axios";

export const createCourse=async(newsValue:FormData)=>{
    const response=await axios.post(`${process.env.NEXT_PUBLIC_URL}/course`,newsValue);
    return response.data
}