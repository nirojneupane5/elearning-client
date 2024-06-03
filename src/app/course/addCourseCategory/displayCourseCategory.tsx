import {
  deleteCourseCategory,
  displayCourseCategory,
} from "@/api/course/course-api";
import { TCourseCategoryResponse } from "@/api/course/course-type";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const DisplayCourseCategory = () => {
  const queryClient = useQueryClient();
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
  const mutation = useMutation({
    mutationFn: deleteCourseCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-cateogry"] });
    },
  });
  const handleClick = (id: string) => {
    mutation.mutate(id);
  };
  return (
    <div className="grid grid-cols-4 py-5 gap-5">
      {data &&
        data.map((info, index) => (
          <div
            key={index}
            className="shadow-md rounded-md px-5 py-3 border-[1px] border-gray-200 hover:scale-105 duration-300"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-black">{info.category_name}</h1>
              <Button
                className="bg-red-500"
                onClick={() => handleClick(info._id)}
              >
                X
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayCourseCategory;
