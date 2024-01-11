"use client";
import { useState } from "react";
import { TextField, Callout, Text, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "../../ValidationSchema";
import { z } from "zod";
import Spinner from "../../components/Spinner";

// interface IssueForm{
//   title:string;
//   description:string;
// }
type IssueForm = z.infer<typeof createIssueSchema>;
const Issuepage = () => {
  const [issubmitting, setsubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = async (data: IssueForm) => {
    try {
      setsubmitting(true);
      await axios.post("/api/issues", data);
      router.replace("/issues");
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
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
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
          Submit New Issue {issubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default Issuepage;

