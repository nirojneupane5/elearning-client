"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [query] = useDebounce(search, 500);
  useEffect(() => {
    if (!query) {
      router.push("/");
    } else {
      router.push(`/course?search=${query}`);
    }
  }, [query, router]);
  return (
    <div className="flex items-center relative">
      <AiOutlineSearch className="absolute text-black right-2" />
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-black rounded-md py-1 px-2"
      />
    </div>
  );
};

export default SearchBar;
