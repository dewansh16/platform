"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface ChapterCodeFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
    code: z.string().min(1),
});

export const ChapterCodeForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterCodeFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: initialData?.code || ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
          toast.success("Chapter updated");
          toggleEdit();
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        }
      }
    
    return (
        <div className="mt-6 border border-primary/20 shadow-md bg-secondary bg-opacity-95 rounded-[5px] p-4">
            <div className="font-semibold flex items-center justify-between text-xl">
                Chapter Code
                <Button onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                    <>
                        <p>Edit</p>
                    </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className="flex justify-between">
                    <p className={cn(
                        "flex text-primary/70 mt-2 text-sm",
                        !initialData.code && "text-primary/70 italic text-sm"
                        )}>
                        {initialData.code || "No code"}
                    </p>
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                    >
                        <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="rounded ">
                                    <Textarea
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'console.log('Hello World')"
                                    {...field}
                                    className="bg-secondary border-primary/20"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                    disabled={!isValid || isSubmitting}
                    type="submit"
                    className=" flex"
                    variant="basic"
                    >
                        Save
                    </Button>
                </form>
                </Form>
            )}
        </div>
    )
}