import { TCourse, searchCourse } from "@/api/course-api";
import DisplayCourse from "@/components/course/DisplayCourse";
import { Suspense } from "react";

const CourseDisplay = async ({
  searchParams,
}: {
  searchParams: { search: string | undefined };
}) => {
  if (searchParams.search === undefined) {
    return <div>Undefined</div>;
  }
  const courseData = await searchCourse<TCourse>(searchParams.search);
  if (courseData.length === 0) {
    return (
      <div className="text-xl font-bold text-center text-red-500">
        No result found
      </div>
    );
  }
  return (
    <div className="max-w-[1320px] mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayCourse courseData={courseData} />
      </Suspense>
    </div>
  );
};

export default CourseDisplay;
