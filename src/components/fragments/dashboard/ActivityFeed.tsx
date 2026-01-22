import { Bell, Calendar, CheckCircle, ChevronsUp, LogIn, LogOut, Package, Search, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Activity } from "@/types/hotel";

import { cn } from "@/lib/utils";

type ActivityFeedProps = {
  activities: Activity[];
}

const activityIcons = {
  'check-in': LogIn,
  'check-out': LogOut,
  'booking': Calendar,
  'cancellation': XCircle,
  'guest-request': Bell,
  'lost-item': Search,
  'found-item': Package,
  'item-returned': CheckCircle,
};

const activityColors = {
  'check-in': 'text-success bg-success/10',
  'check-out': 'text-info bg-info/10',
  'booking': 'text-primary bg-primary/10',
  'cancellation': 'text-destructive bg-destructive/10',
  'guest-request': 'text-warning bg-warning/10',
  'lost-item': 'text-destructive bg-destructive/10',
  'found-item': 'text-info bg-info/10',
  'item-returned': 'text-success bg-success/10',
};

export const ActivityFeed = ({ activities }: ActivityFeedProps ) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const styleStatusContainer = useMemo(() => `
    ${statusOpen ? 'h-[500px]' : 'h-[50px]'}  
  `, [statusOpen]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    const buttonIndividual = document.querySelector<HTMLAnchorElement>('#individual');;
    if (statusOpen) {
      return buttonIndividual?.focus();
    }

    return buttonIndividual?.blur();
  }, [statusOpen]);

  return (
    <section className={`fixed bottom-5 right-5 bg-white shadow-sm border border-border shadow-primary rounded-xl w-87.5 transition-all duration-200 overflow-auto ${styleStatusContainer}`}>
      <div className="relative">
        <header className="flex justify-between h-12.5 items-center sticky top-0 bg-white p-6 shadow-sm">
          <h4 className="font-semibold text-xl">Recent Activity</h4>
          <ChevronsUp size={20} className={`cursor-pointer ${statusOpen ? 'rotate-180' : ''}`}  onClick={() => setStatusOpen(!statusOpen)}/>
        </header>
        <section className={`p-4 inset-shadow-xs ${!statusOpen && 'h-0 overflow-hidden p-0!'}`}>
          <div className="space-y-4 pb-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type];
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg shrink-0", activityColors[activity.type])}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* {
            Object.keys(statusOptionList).map((status: string, index: number) => {
              const currentStatus = statusOptionList[status as keyof typeof statusOptionList];
              return (
                <section className="mb-4" key={index}>
                  <h4 className="font-medium text-lg mb-2 capitalize">{currentStatus.label}</h4>
                  <div className="flex flex-col gap-1 items-start">
                    {currentStatus.data.map((item, index) => (
                      <button className="hover:underline !text-sm" key={index}>{item.label}</button>
                    ))}
                  </div>
                </section>
              )
            })
          } */}
        </section>
      </div>
    </section>
  )
}

ActivityFeed.displayName = "ActivityFeed";