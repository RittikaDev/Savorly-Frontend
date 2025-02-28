"use client";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory } from "@/services/Category";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateCategoryModal = () => {
	const [imageFiles, setImageFiles] = useState<File[] | []>([]);
	const [imagePreview, setImagePreview] = useState<string[] | []>([]);

	const form = useForm();
	const {
		formState: { isSubmitting },
	} = form;

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("data", JSON.stringify(data));
			formData.append("icon", imageFiles[0] as File);

			const res = await createCategory(formData);
			console.log(res);

			if (res?.success) {
				toast.success(res?.message);
			} else {
				toast.error(res?.message);
			}
		} catch (err: unknown) {
			console.error(err);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Create Category</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Product Category</DialogTitle>
				</DialogHeader>
				{/* THE <FORM> COMPONENT IS A WRAPPER AROUND THE FORM ELEMENTS.
				{...FORM} SPREADS THE FORM OBJECT, PASSING ALL FORM PROPERTIES (CONTROL, METHODS, ETC.). */}
				<Form {...form}>
					{/* FORM.HANDLESUBMIT(ONSUBMIT) IS A METHOD FROM REACT-HOOK-FORM. IT VALIDATES THE FORM AND CALLS ONSUBMIT IF THERE ARE NO ERRORS. */}
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control} // TIES THE FIELD TO REACT-HOOK-FORM CONTROL.
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										{/* {...field} BINDS THE INPUT TO REACT-HOOK-FORM (HANDLES VALUE, ONCHANGE, ETC.).
										value={field.value || ""} => ENSURES THE INPUT DOESN’T SHOW UNDEFINED. */}
										<Input type="text" {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between mt-5">
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												className="h-36 w-72"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{imagePreview.length > 0 ? (
								<ImagePreviewer
									setImageFiles={setImageFiles}
									imagePreview={imagePreview}
									setImagePreview={setImagePreview}
									className="mt-8"
								/>
							) : (
								<div className="mt-8">
									<NMImageUploader
										setImageFiles={setImageFiles}
										setImagePreview={setImagePreview}
										label="Upload Icon"
									/>
								</div>
							)}
						</div>

						<Button type="submit" className="mt-5 w-full">
							{isSubmitting ? "Creating...." : "Create"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateCategoryModal;
