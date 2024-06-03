import { displaySingleCourse } from "@/api/course/course-api";
import { TCourseSingle } from "@/api/course/course-type";
import Image from "next/image";
import { Suspense } from "react";

const DisplaySingleCourse = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const data = await displaySingleCourse<TCourseSingle>(params.courseId);

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-black py-2 px-4">
            Course Name: {data.course_name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-[30%_auto] ">
            <div className="px-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_COURSE_IMAGE}/${data.course_image}`}
                width={300}
                height={200}
                alt={`${data.course_name}`}
                className="object-cover w-full h-[150px] md:h-[200px] "
              />
              <h2 className="text-xl md:text-2xl font-bold text-black py-4">
                {" "}
                Course Price: Rs {data.price}
              </h2>
            </div>
            <p className="text-xl font-light text-black text-justify px-4">
              {data.course_desc.slice(0, 913)} -
            </p>
          </div>
          <p className="text-xl font-light text-black text-justify py-3">
            {" "}
            {data.course_desc.slice(913, 1476)} -
          </p>
          <p className="text-xl font-light text-black text-justify py-3">
            {" "}
            {data.course_desc.slice(1476)} -
          </p>
        </div>
      </Suspense>
    </section>
  );
};

export default DisplaySingleCourse;
