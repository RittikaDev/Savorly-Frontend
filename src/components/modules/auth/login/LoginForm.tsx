"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

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

import Brand from "@/assets/hero_section/Brand.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";

import ReCAPTCHA from "react-google-recaptcha";

import { loginSchema } from "./loginValidation";
import Image from "next/image";
import SocialLogin from "../SocialLogin/social-login";
// import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { setIsLoading } = useUser();

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) setReCaptchaStatus(true);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) router.push(redirect);
        else router.push("/");
      } else toast.error(res?.message);

      // await signIn("credentials", {
      // 	email: data.email,
      // 	password: data.password,
      // 	redirect: true,
      // 	callbackUrl: "http://localhost:3000/",
      // });
    } catch (err: unknown) {
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
      {/* <div className="border border-gray-200 bg-white shadow-lg rounded-2xl p-6 max-w-md w-full"> */}
      <div className="relative z-10 bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <div className="flex flex-col items-center justify-center text-center mb-4">
          {/* Logo */}
          {/* <Image
            src={Brand}
            alt="Logo"
            width={70}
            height={70}
            className="mb-2"
          /> */}
          <h1 className="text-2xl font-black text-primary flex items-center mb-4">
            <Image src={Brand} alt="Logo" width={45} height={45} />
            avorly
          </h1>
          {/* Login Heading */}
          <h1 className="text-2xl font-bold text-gray-300">
            Login to Get Started
          </h1>
        </div>

        {/* {...form} => SPREADING THE FORM OBJECT TO PROVIDE GLOBAL FORM STATE AND VALIDATION */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* control={form.control} => CONNECTS THIS FIELD TO REACT-HOOK-FORM */}
            {/* render={({ field }) => (...)} => USES A RENDER PROP TO PASS FIELD PROPERTIES */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    {/* {...field} => SPREADS ALL PROPERTIES FROM REACT-HOOK-FORM (LIKE ONCHANGE, VALUE, ONBLUR) */}
                    <Input
                      type="email"
                      {...field}
                      value={field.value || ""}
                      className="bg-gray-400 border-gray-300 focus:border-primary focus:ring-primary"
                    />
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
                      className="bg-gray-400 border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-center rounded-lg w-full bg-white/20 backdrop-blur-lg">
              <div style={{ transform: "scale(0.8)" }}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
                  onChange={handleReCaptcha}
                />
              </div>
            </div>

            <Button
              disabled={!reCaptchaStatus}
              type="submit"
              className="mt-5 w-full bg-primary text-white hover:bg-primary-dark transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <SocialLogin />

        <p className="text-sm text-gray-400 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
