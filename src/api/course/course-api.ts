import axios from "axios";
import { TCourseCategory } from "./course-type";

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

//Display Single course
export const displaySingleCourse=async<T>(id:string):Promise<T>=>{
    const response=await axios.get<T>(`${process.env.NEXT_PUBLIC_URL}/course/${id}`);
    return response.data
}

//Search course api
export const searchCourse=async<T>(course_name:string):Promise<T>=>{
    const response=await axios.get<T>(`${process.env.NEXT_PUBLIC_URL}/courseSearch?course_name=${course_name}`);
    return response.data;
}

//Add course categroy
export const addCourseCategory=async(newValue:TCourseCategory)=>{
    const response=await axios.post(`${process.env.NEXT_PUBLIC_URL}/course-category`,newValue);
    return response.data;
}