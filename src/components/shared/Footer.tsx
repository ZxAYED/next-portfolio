"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { MdPhoneAndroid } from "react-icons/md";
import { SiGmail } from "react-icons/si";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ZButton from "./ZButton";

const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    AOS.init();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="relative  w-full ">
      <div className="absolute inset-0">
        <Image
          src="https://i.ibb.co/QcbsFHy/footer.jpg"
          alt="Footer background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0  mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full py-16 px-4">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={150}
          height={100}
          className="mb-8"
          priority
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-white text-center">
          <div>
            <MdPhoneAndroid className="text-5xl mx-auto" />
            <p className="text-xl mt-2">01902320296</p>
          </div>
          <div>
            <SiGmail className="text-5xl mx-auto" />
            <p className="text-xl mt-2">zzayediqbalofficial@gmail.com</p>
          </div>
          <div>
            <FaLinkedin className="text-5xl mx-auto" />
            <p className="text-xl mt-2">LinkedIn</p>
          </div>
          <div>
            <FaFacebookSquare className="text-5xl mx-auto" />
            <p className="text-xl mt-2">Facebook</p>
          </div>
        </div>

        <div
          className="max-w-3xl w-full bg-gray-900 
 p-8 mt-12 rounded-xl"
          data-aos="fade-up"
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Leave a message
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Your Name"
              className="border-gray-500 text-white"
            />

            {errors.name && typeof errors.name.message === "string" && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Your Email"
              className="border-gray-500 text-white"
            />
            {errors.email && typeof errors.email.message === "string" && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Your Message"
              className="border-gray-500 text-white min-h-[120px]"
            />
            {errors.message && typeof errors.message.message === "string" && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}

            <div className="flex justify-center items-center ">
              <ZButton name="Send Message"></ZButton>
            </div>
          </form>
        </div>

        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      </div>
    </div>
  );
};

export default Footer;
