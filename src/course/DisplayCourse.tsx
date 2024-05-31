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
            <div className="px-2 py-2">
              <h1 className="text-2xl font-bold text-black">
                Course Name:{info.course_name}
              </h1>
              <h3 className="text-xl font-bold text-red-400">
                Price: Rs {info.price}
              </h3>
              <p className="text-justify line-clamp-3 font-light text-black">
                {info.course_desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
