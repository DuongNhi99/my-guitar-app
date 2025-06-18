
import { motion } from "framer-motion";

interface CourseCardProps {
  title: string;
  description: string;
  link: string;
}

export default function CourseCard({ title, description, link }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-xl"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <a href={link} className="text-blue-500 font-bold hover:underline">Start Learning</a>
    </motion.div>
  );
}

