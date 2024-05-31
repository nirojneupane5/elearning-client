import axios from "axios";

export type TCourse={
    course_name:string;
    course_desc:string;
    price:string;
    course_image:string
}[]

//Create a course
export const createCourse=async(newsValue:FormData)=>{
    const response=await axios.post(`${process.env.NEXT_PUBLIC_URL}/course`,newsValue);
    return response.data
}


//Display Course
export const displayCourse=async <T>():Promise<T>=>{
    const response=await axios.get<T>(`${process.env.NEXT_PUBLIC_URL}/course`);
    return response.data
}