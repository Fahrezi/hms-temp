import { cn } from "@/libs/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-xs hover:shadow border border-gray-200 p-6", className)}>
      {children}
    </div>
  )
}

export default Card;