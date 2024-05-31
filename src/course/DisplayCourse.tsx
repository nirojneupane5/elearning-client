import { TCourse } from "@/api/course-api";

type CourseProps = {
  courseData: TCourse;
};

export default function DisplayCourse({ courseData }: CourseProps) {
  return (
    <section>
      {courseData.map((info, index) => (
        <h1 key={index}>{info.course_name}</h1>
      ))}
    </section>
  );
}
