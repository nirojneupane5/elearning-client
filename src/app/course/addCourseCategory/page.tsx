"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { addCourseCategory } from "@/api/course-api";
const formSchema = z.object({
  category_name: z
    .string()
    .min(2, { message: "Please enter the course categroy" }),
});
const AddCourseCategory = () => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: addCourseCategory,
    onSuccess: () => {
      form.reset(),
        queryClient.invalidateQueries({ queryKey: ["course-cateogry"] });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };
  return (
    <div className="max-w-[1320px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cateogry name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cateogry name"
                    {...field}
                    className="w-[300px]"
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

export default AddCourseCategory;
