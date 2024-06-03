import SearchBar from "@/components/searchbox/SearchBar";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex justify-center items-center bg-black py-3 text-white gap-5 text-[17px]">
      <Link href="/" className="hover:text-blue-500">
        Home
      </Link>
      <Link href="/course/addCourse" className="hover:text-blue-500">
        Add Course
      </Link>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
