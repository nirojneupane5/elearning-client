import { TCourse } from "@/api/course/course-type";
import Image from "next/image";
import Link from "next/link";

type CourseProps = {
  courseData: TCourse;
};

export default function DisplayCourse({ courseData }: CourseProps) {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pt-4 px-3">
        {courseData.map((info, index) => (
          <Link href={`/course/${info._id}`} key={index}>
            <div className="shadow-md rounded-md text-center hover:scale-105 hover:shadow-xl duration-300">
              <Image
                src={`${process.env.NEXT_PUBLIC_COURSE_IMAGE}/${info.course_image}`}
                alt="Course Image"
                className="object-cover h-[200px] w-full"
                width={500}
                height={500}
              />

              <div className="px-2 py-2">
                <h1>
                  Course Name:{" "}
                  <span className="text-2xl font-bold text-black">
                    {info.course_name}
                  </span>
                </h1>
                <h3 className="text-xl font-bold text-red-400">
                  Price: Rs {info.price}
                </h3>
                <p className="text-justify line-clamp-3 font-light text-black">
                  {info.course_desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
