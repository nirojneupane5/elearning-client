import { TCourse } from "@/api/course-api";
const DisplayCourse = (courseData: { courseData: TCourse }) => {
  return (
    <section>
      {courseData.courseData &&
        courseData.courseData.map((info, index) => (
          <div key={index}>{info.course_name}</div>
        ))}
    </section>
  );
};

export default DisplayCourse;
