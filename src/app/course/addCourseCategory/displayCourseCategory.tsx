import { displayCourseCategory } from "@/api/course/course-api";
import { TCourseCategoryResponse } from "@/api/course/course-type";
import { useQuery } from "@tanstack/react-query";
const DisplayCourseCategory = () => {
  const { isLoading, error, data } = useQuery<TCourseCategoryResponse>({
    queryKey: ["course-cateogry"],
    queryFn: displayCourseCategory,
  });
  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (error) {
    <h1>Error while fetching cateogry</h1>;
  }
  return (
    <div className="mt-5">
      {data &&
        data.map((info, index) => <h1 key={index}>{info.category_name}</h1>)}
    </div>
  );
};

export default DisplayCourseCategory;
