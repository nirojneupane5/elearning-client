import { TCourse } from "@/api/course-api";
import Image from "next/image";

type CourseProps = {
  courseData: TCourse;
};

export default function DisplayCourse({ courseData }: CourseProps) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pt-2">
        {courseData.map((info, index) => (
          <div key={index} className="shadow-md rounded-md text-center">
            <div className="overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_COURSE_IMAGE}/${info.course_image}`}
                alt="Course Image"
                className="object-cover h-[200px] w-full hover:scale-150 duration-300"
                width={500}
                height={500}
              />
            </div>
            <h1>{info.course_name}</h1>
            <h3>{info.price}</h3>
            <p>{info.course_desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
