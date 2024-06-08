"use client";
import { useState } from "react";
import {
  deleteCourseCategory,
  displayCourse,
  displayCourseCategory,
  updateCourseCategory,
} from "@/api/course/course-api";
import { TCourse, TCourseCategoryResponse } from "@/api/course/course-type";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const DisplayCourseCategory = () => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery<TCourseCategoryResponse>({
    queryKey: ["course-cateogry"],
    queryFn: displayCourseCategory,
  });

  const { data: course } = useQuery<TCourse>({
    queryKey: ["course"],
    queryFn: displayCourse,
  });
  console.log(course);

  const { toast } = useToast();
  const [catgoryName, setCategoryName] = useState<string>("");

  if (isLoading) {
    <h1>Loading...</h1>;
  }
  if (error) {
    <h1>Error while fetching cateogry</h1>;
  }
  //Delete a course category
  const mutation = useMutation({
    mutationFn: deleteCourseCategory,
    onError: (error: AxiosError) => {
      let errorResponse =
        JSON.stringify(error.response?.data) ||
        "An unexpected error has occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorResponse,
      });
    },
    onSuccess: () => {
      toast({
        variant: "sucess",
        title: "Success",
        description: "Course category deleted sucessfully",
      }),
        queryClient.invalidateQueries({ queryKey: ["course-cateogry"] });
    },
  });

  //Update a course category
  const updateMutation = useMutation({
    mutationFn: updateCourseCategory,
    onError: (error: AxiosError) => {
      let errorResponse =
        JSON.stringify(error.response?.data) ||
        "An unexpected error has occurred";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorResponse,
      });
    },
    onSuccess: () => {
      toast({
        variant: "sucess",
        title: "Success",
        description: "Course category Updated sucessfully sucessfully",
      }),
        queryClient.invalidateQueries({ queryKey: ["course-cateogry"] });
    },
  });

  const handleClick = (id: string) => {
    mutation.mutate(id);
  };

  const handleUpdate = (id: string, catgoryName: string) => {
    const info = {
      id: id,
      category_name: catgoryName,
    };
    updateMutation.mutate(info);
  };
  return (
    <div className="grid grid-cols-3 py-5 gap-5">
      {data &&
        data.map((info, index) => (
          <div
            key={index}
            className="shadow-md rounded-md px-5 py-3 border-[1px] border-gray-200 hover:scale-105 duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl text-black">{info.category_name}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-red-500 hover:bg-red-700"
                  onClick={() => handleClick(info._id)}
                >
                  X
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-500 hover:bg-blue-700">
                      Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Category name</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Input
                          type="text"
                          placeholder={info.category_name}
                          value={catgoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        className="px-3"
                        onClick={() => handleUpdate(info._id, catgoryName)}
                      >
                        Update
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DisplayCourseCategory;
