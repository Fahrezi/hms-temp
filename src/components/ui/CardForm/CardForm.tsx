import { cn } from "@/libs/utils";

type CardFormProps = {
  children: React.ReactNode;
  title: string;
  className: string;
}

const CardForm = (props: CardFormProps) => {
  const { children, title, className } = props;
  return (
    <div className="grid grid-cols-[1fr_120px] bg-white rounded-xl p-6 border border-[#DADADA]">
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