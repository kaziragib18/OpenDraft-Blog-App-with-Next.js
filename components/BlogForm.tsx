"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const BlogForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  interface FormState {
    error: string;
    status: "INITIAL" | "SUCCESS" | "ERROR";
    _id?: string;
  }

  const handleFormSubmit = async (prevState: FormState, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your blog has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="blog-form">
      <div>
        <label htmlFor="title" className="blog-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="blog-form_input"
          required
          placeholder="Blog Title"
        />

        {errors.title && <p className="blog-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="blog-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="blog-form_textarea"
          required
          placeholder="Blog Description"
        />

        {errors.description && (
          <p className="blog-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="blog-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="blog-form_input"
          required
          placeholder="Blog Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="blog-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="blog-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="blog-form_input"
          required
          placeholder="Set a blog Image URL"
        />

        {errors.link && <p className="blog-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="blog-form_label">
          Write Your Blog
        </label>

        <MDEditor className="mt-3"
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Tell us what your blog is about, who it's for, and what makes it stand out or different.",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="blog-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="blog-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Blog"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default BlogForm;
