import { cn } from "@/libs/utils";

type CardFormProps = {
  children: React.ReactNode;
  title: string;
  className: string;
}

const CardForm = (props: CardFormProps) => {
  const { children, title, className } = props;
  return (
    <div className="bg-gray-100/10 border border-gray-200 rounded-xl p-6">
      <div>
        <header className="flex justify-between mb-4">
          <h2 className="font-medium text-xl">{title}</h2>
        </header>
        <div className={cn("", className)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CardForm;