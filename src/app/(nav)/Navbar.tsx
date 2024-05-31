import Link from "next/link";
const Navbar = () => {
  return (
    <div className="flex justify-center  bg-black py-5 text-white gap-5 text-[17px]">
      <Link href="/" className="hover:text-blue-500">
        Home
      </Link>
      <Link href="/addCourse" className="hover:text-blue-500">
        Add Course
      </Link>
    </div>
  );
};

export default Navbar;
