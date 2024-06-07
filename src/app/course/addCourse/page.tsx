"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Textarea } from "@/components/ui/textarea";
import { createCourse, displayCourseCategory } from "@/api/course/course-api";
import { TCourseCategoryResponse } from "@/api/course/course-type";

const formSchema = z.object({
  course_name: z.string().min(2, { message: "Please enter the course name" }),
  course_desc: z.string().min(20, {
    message: "Course description must be at least 20 characters long",
  }),
  price: z.number().min(0, { message: "Please enter the course price" }),
  image: z
    .any()
    .refine((file) => file?.length == 1, "Image is required")
    .optional(),
  category: z.string({ required_error: "Please select the course category" }),
});

type FormValues = z.infer<typeof formSchema>;

const Course = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data } = useQuery<TCourseCategoryResponse>({
    queryKey: ["course-category"],
    queryFn: displayCourseCategory,
  });
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: "",
      course_desc: "",
      price: 0,
    },
  });

  const fileRef = form.register("image");

  const mutation = useMutation({
    mutationFn: createCourse,
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
      form.reset();
      toast({
        variant: "sucess",
        title: "Success",
        description: "Course created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("course_name", values.course_name);
    formData.append("course_desc", values.course_desc);
    formData.append("price", values.price.toString());

    if (values.image && values.image[0]) {
      formData.append("image", values.image[0]);
    }
    mutation.mutate(formData);
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[400px]"
        >
          <FormField
            control={form.control}
            name="course_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="Course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Course Description"
                    className="h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Image"
                    type="file"
                    {...fileRef}
                    accept="image/png, image/jpeg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Course category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select the course category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data &&
                      data.map((info, index) => (
                        <SelectItem value={info.category_name} key={index}>
                          {info.category_name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Course;
