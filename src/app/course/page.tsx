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
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "@/api/course-api";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const formSchema = z.object({
  course_name: z.string().min(2, { message: "Please enter the course name" }),
  course_desc: z.string().min(2, {
    message: "Course description must be at least 20 characters long",
  }),
  price: z.number().min(0, { message: "Please enter the course price" }),
  image: z
    .any()
    .refine((file) => file?.length == 1, "Image is required")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Course = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
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
      console.log(errorResponse);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="course_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course name"
                    {...field}
                    className="max-w-[400px]"
                  />
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
                  <Input
                    placeholder="Course Description"
                    {...field}
                    className="max-w-[400px]"
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
                    className="max-w-[400px]"
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
                    className="max-w-[400px]"
                    accept="image/png, image/jpeg"
                  />
                </FormControl>
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
