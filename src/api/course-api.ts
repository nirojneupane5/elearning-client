import axios from "axios";

//Create a course
export const createCourse=async(newsValue:FormData)=>{
    const response=await axios.post(`${process.env.NEXT_PUBLIC_URL}/course`,newsValue);
    console.log(response.data);
    return response.data
}