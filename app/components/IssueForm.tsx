"use client";
import { useState } from "react";
import { TextField, Callout, Text, Button } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../ValidationSchema";
import { z } from "zod";
import Spinner from "./Spinner";
import { Issue } from "@prisma/client";
const SimpleMDE=dynamic(()=>import("react-simplemde-editor"),{
  ssr:false,
});
// interface IssueForm{
//   title:string;
//   description:string;
// }
type IssueFormData = z.infer<typeof createIssueSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [issubmitting, setsubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: IssueFormData) => {
    try {
      setsubmitting(true);
      // await axios.post("/api/issues", data);
      if(issue) await axios.patch('/api/issues/'+issue.id,data);
      else await axios.post('/api/issues',data);
      router.push("/issues/all");
      setValue("title", "");
      setValue("description", "");
      
      setsubmitting(false);
    } catch (error) {
      setsubmitting(false);

      setError("An unexpected error occured");
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className=" max-w-xl space-y-3 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root>
        <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title?.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        {/* <Button className="cursor-pointer" type="Submit">Submit New Issue</Button> */}
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        {/* <button className="cursor-pointer text-white text-2xl bg-purple-600 rounded-2xl p-2" type="submit">Submit New Issue <Spinnner/></button> */}
        <Button  disabled={issubmitting}>
        {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {issubmitting && <Spinner />}        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

