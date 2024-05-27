import axios from "axios";

export const createCourse=async<T>(newsValue:T):Promise<T>=>{
    const response=await axios.post(`${process.env.NEXT_PUBLIC_URL}/course`,newsValue);
    return response.data
}