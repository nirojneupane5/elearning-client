export type TCourse={
    _id:string;
    course_name:string;
    course_desc:string;
    price:string;
    course_image:string
}[]

export type TCourseSingle={
    _id:string;
    course_name:string;
    course_desc:string;
    price:string;
    course_image:string
}

//Defining the type of course category
export type TCourseCategory={
    category_name:string
}

//Category Response
export type TCourseCategoryResponse={
    _id:string,
    category_name:string
}[]