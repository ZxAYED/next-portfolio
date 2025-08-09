"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import img from "../../../public/images/Ellipse.svg";
import DashedRotatedTitle from "../Reuseable/DashedRotatedTitle";
import ReuseableButton from "../Reuseable/ReuseableButton";
import ScrollStack, { ScrollStackItem } from "./ScrollStackItem";
import TestimonialCard from "./TestimonialCard";

const testimonialsData = [
  {
    id: 1,
    clientName: "paul_van_oers",
    avatar: img,
    rating: 5.0,
    maxRating: 5,
    review:
      "I was genuinely surprised and extremely satisfied with the work Manir delivered. Communication was excellent and very fast. Manir managed to transform my website from a dull one-pager into a stunning, professional site with five clear, well-structured pages, and he did it remarkably quickly. The only minor point of criticism is that the website went live before it was fully finalized (some texts and contact details weren’t correct yet). However, this was resolved swiftly, and overall I’m incredibly happy with the result. Manir and I are already discussing revamping a second website, which shows how much I value his work. I highly recommend him to anyone looking for a reliable and skilled developer!",
    service: "Wordpress",
    date: "2 weeks ago",
  },
  {
    id: 2,
    clientName: "bradstone52",
    avatar: img,
    rating: 5.0,
    maxRating: 5,
    review:
      "Working with Manir was a great experience. He was very attentive and available to meet and discuss, we had multiple web calls that were extremely helpful. Rather than texting/email, Manir prefers to discuss over a live chat which for me is far more meaningful and effective. I would highly recommend Manir! Great guy and very good at what he does. Thanks, Brad Stone",
    service: "Webflow",
    date: "2 months ago",
  },
  {
    id: 3,
    clientName: "joebarrantes",
    avatar: img,
    rating: 5.0,
    maxRating: 5,
    review:
      "Manir and his team will be life-long partners, their exceptional work ethic and dedication to their clients gives me faith again in partnering and hiring work. Thank you guys!",
    service: "Website Development",
    date: "1 month ago",
  },
  {
    id: 4,
    clientName: "johndoe12",
    avatar: img,
    rating: 4.5,
    maxRating: 5,
    review:
      "Excellent service and amazing quality. I was very pleased with how my website turned out and highly recommend Manir for anyone needing professional web development.",
    service: "Shopify",
    date: "3 months ago",
  },
  {
    id: 5,
    clientName: "janedoe99",
    avatar: img,
    rating: 5.0,
    maxRating: 5,
    review:
      "Manir helped me build a robust e-commerce platform. The attention to detail and performance improvements were exactly what I needed. Very pleased with the results!",
    service: "E-commerce Development",
    date: "6 months ago",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="mt-32 max-w-5xl mx-auto md:mt-40">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DashedRotatedTitle title="Testimonials" />
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Fiverr Client Feedback
        </motion.h2>

        <motion.p
          className=" "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Discover what our customers are saying about their experiences with
          us. Read their testimonials to understand their satisfaction and the
          impact of our work.
        </motion.p>
      </motion.div>

      <div className="space-y-6 overflow-y-auto h-[600px] md:h-[700px]">
        <ScrollStack>
          {testimonialsData.map((testimonial) => (
            <ScrollStackItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="grid place-items-center -mt-16"
      >
        <Link
          href="https://www.fiverr.com/shopify_manir#reviews"
          className="w-full mx-auto md:grid place-items-center"
        >
          <ReuseableButton title="View Now !" showArrow />
        </Link>
      </motion.div>
    </section>
  );
}
