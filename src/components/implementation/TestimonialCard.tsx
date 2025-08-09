import { motion } from "framer-motion";
import Image from "next/image";

interface ITestimonialsData {
  id: number;
  clientName: string;
  avatar: string;
  rating: number;
  maxRating: number;
  review: string;
  service: string;
  date: string;
}
interface TestimonialCardProps {
  testimonial: ITestimonialsData;
}
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
  >
    <path
      d="M7.23915 0.741642C7.48264 0.00459289 8.51736 0.00459291 8.76085 0.741642L9.97569 4.48065C10.0828 4.81027 10.39 5.0334 10.7366 5.0334H14.668C15.4429 5.0334 15.7652 6.02513 15.1382 6.48065L11.9576 8.79152C11.6773 8.9952 11.5599 9.35632 11.6671 9.68594L12.8819 13.425C13.1254 14.162 12.2778 14.7749 11.6508 14.3194L8.47016 12.0085C8.18992 11.8048 7.81008 11.8048 7.52984 12.0085L4.34924 14.3194C3.72222 14.7749 2.87464 14.162 3.11813 13.425L4.33297 9.68594C4.44013 9.35632 4.32274 8.9952 4.04239 8.79152L0.861835 6.48065C0.234816 6.02513 0.557067 5.0334 1.33201 5.0334H5.26343C5.61001 5.0334 5.91724 4.81027 6.02431 4.48065L7.23915 0.741642Z"
      fill={filled ? "#FFD900" : "#374151"}
    />
  </svg>
);

const FiverrLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="106"
    height="32"
    viewBox="0 0 106 32"
    fill="none"
  >
    <g clip-path="url(#clip0_156_674)">
      <path
        d="M97.2226 15.3386H93.4864C91.0811 15.3386 89.7925 17.1484 89.7925 20.1642V31.0665H82.7063V15.3375H79.6992C77.294 15.3375 76.0065 17.1473 76.0065 20.1631V31.0654H68.9192V9.52115H76.0065V12.7962C77.1666 10.2538 78.7556 9.52115 81.1184 9.52115H89.7936V12.7962C90.9538 10.2538 92.5428 9.52115 94.9056 9.52115H97.2237L97.2226 15.3386ZM67.3726 21.974H52.5984C52.9847 24.3874 54.4877 25.7663 57.0214 25.7663C58.9108 25.7663 60.2429 24.9899 60.6728 23.6121L66.9427 25.3781C65.3973 29.1266 61.5739 31.4109 57.0214 31.4109C49.3333 31.4109 45.8114 25.4207 45.8114 20.2944C45.8114 15.2533 48.9034 9.22044 56.5915 9.22044C64.7519 9.22044 67.4575 15.3386 67.4575 19.8635C67.4629 20.568 67.4346 21.2723 67.3726 21.974ZM60.5008 17.7946C60.3289 15.9411 58.9967 14.2189 56.5926 14.2189C54.3582 14.2189 53.0283 15.2085 52.5984 17.7946H60.5008ZM33.4435 31.0654H39.6699L47.444 9.52334H40.3153L36.5355 22.0604L32.6697 9.52225H25.5824L33.4435 31.0654ZM4.40975 31.0654H11.4535V15.3386H18.1555V31.0665H25.1558V9.52225H11.4535V8.18707C11.4535 6.72178 12.4842 5.81745 14.1167 5.81745H18.1544V0H12.9576C7.84565 0 4.40975 3.14601 4.40975 7.75514V9.52225H0.415527V15.3397H4.40975V31.0654Z"
        fill="white"
      />
      <path
        d="M101.604 31.7116C104.023 31.7116 105.985 29.7433 105.985 27.3157C105.985 24.8881 104.023 22.9209 101.604 22.9209C99.1847 22.9209 97.2224 24.8892 97.2224 27.3168C97.2224 29.7444 99.1847 31.7116 101.604 31.7116Z"
        fill="#1DBF73"
      />
    </g>
    <defs>
      <clipPath id="clip0_156_674">
        <rect
          width="105.6"
          height="32"
          fill="white"
          transform="translate(0.400024)"
        />
      </clipPath>
    </defs>
  </svg>
);

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      id={`testimonial-${testimonial.id}`}
      className={`relative p-6 rounded-xl border  bg-[#001605] transition-all duration-300 cursor-pointer 
        `}
    >
      <div className="flex items-center justify-between mb-4 border-b border-[#1C540E] pb-4">
        <div className="flex items-center gap-3">
          <Image
            height={480}
            width={480}
            quality={100}
            src={testimonial.avatar}
            alt={testimonial.clientName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-base md:text-2xl text-primary font-medium">
            {testimonial.clientName}
          </span>
        </div>
        <div>
          <FiverrLogo />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < Math.floor(testimonial.rating)} />
          ))}
        </div>
        <span className="font-medium">
          {testimonial.rating}/{testimonial.maxRating}
        </span>
      </div>

      <p className="leading-relaxed mb-4">{testimonial.review}</p>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{testimonial.service}</span>
        <span>{testimonial.date}</span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
