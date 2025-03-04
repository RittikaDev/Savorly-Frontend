"use client";

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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Brand from "@/assets/hero_section/Brand.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const { setIsLoading } = useUser();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  //   console.log(password, passwordConfirm);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      setIsLoading(true);

      if (res?.success) {
        toast.success(res?.message);
        if (redirect) router.push(redirect);
        else router.push("/");
      } else toast.error(res?.message);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/login_bg_videp.mp4" type="video/mp4" />
      </video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <div className="flex flex-col items-center justify-center text-center mb-4">
          {/* Logo */}
          <h1 className="text-2xl font-black text-primary flex items-center mb-4">
            <Image src={Brand} alt="Logo" width={45} height={45} />
            avorly
          </h1>

          {/* Login Heading */}
          <h1 className="text-2xl font-bold text-gray-300">
            Register and Start Your Journey!
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage> Password does not match </FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
            {/* Select Field for Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="bg-gray-400 border-gray-300 focus:border-primary focus:ring-primary p-2 w-full"
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      {/* <option value="admin">Admin</option> */}
                      <option value="user">Customer</option>
                      <option value="provider">Meal Provider</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={passwordConfirm && password !== passwordConfirm}
              type="submit"
              className="mt-5 w-full"
            >
              {isSubmitting ? "Registering...." : "Register"}
            </Button>
          </form>
        </Form>
        <p className="text-sm text-gray-400 text-center my-3">
          Already have an account ?
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
