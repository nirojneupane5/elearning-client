import { Suspense } from "react";
import DisplayCourse from "@/components/course/DisplayCourse";
import { displayCourse } from "@/api/course/course-api";
import { TCourse } from "@/api/course/course-type";

const Home = async () => {
  const courseData = await displayCourse<TCourse>();
  return (
    <main className="max-w-[1320px] mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayCourse courseData={courseData} />
      </Suspense>
    </main>
  );
};

export default Home;
