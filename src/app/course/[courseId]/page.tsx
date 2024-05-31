import { TCourseSingle, displaySingleCourse } from "@/api/course-api";

const DisplaySingleCourse = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const data = await displaySingleCourse<TCourseSingle>(params.courseId);

  return <div>{data.course_name}</div>;
};

export default DisplaySingleCourse;
