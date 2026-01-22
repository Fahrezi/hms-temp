import { cn } from "@/lib/utils";

type CardFormProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const CardForm = (props: CardFormProps) => {
  const { children, title, className } = props;
  return (
    <div className="p-2">
      <div>
        {/* <header className="flex justify-between mb-4">
          <h2 className="font-medium text-xl">{title}</h2>
        </header> */}
        <div className={cn("", className)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CardForm;