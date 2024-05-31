import { displayCourse, TCourse } from "@/api/course-api";

const Home = async () => {
  const data = await displayCourse<TCourse>();
  return (
    <main className="max-w-[1320px] mx-auto">
      {data &&
        data.map((info, index) => <h1 key={index}>{info.course_name}</h1>)}
    </main>
  );
};

export default Home;
