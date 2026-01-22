import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  value: number | string;
  subtitle?: string;
  tone?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const KPI = ({ title, value, subtitle, tone="primary", icon: Icon }: Props) => {
  const toneMap: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
    danger: "bg-destructive/30 text-destructive",
  };
  
  return (
    <Card className="space-y-2 p-4!">
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-semibold text-gray-500">{title}</h3>
        {Icon && <div className={cn("p-3 rounded-lg", toneMap[tone])}>
          <Icon size={24} />
        </div>}
      </div>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
      {subtitle && <p className="mt-1 text-sm">{subtitle}</p>}
    </Card>
  )
}

KPI.displayName = "KPI";