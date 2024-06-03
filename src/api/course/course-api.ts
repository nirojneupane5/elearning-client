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

//Display course category
export const displayCourseCategory=async<T>():Promise<T>=>{
    const response=await axios.get<T>(`${process.env.NEXT_PUBLIC_URL}/course-category`);
    return response.data
}

//Delete course category
export const deleteCourseCategory=async(id:string)=>{
    const response=await axios.delete(`${process.env.NEXT_PUBLIC_URL}/course-category/${id}`);
    return response.data;
}


//Update course category


export const updateCourseCategory=async(value:{id:string,category_name:string})=>{
    const response=await axios.patch(`${process.env.NEXT_PUBLIC_URL}/course-category/${value.id}`,{
        category_name:value.category_name
    });
    return response.data
}