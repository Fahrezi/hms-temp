import {
  BarChart3,
  BedDouble, 
  Bell,
  CalendarDays, 
  DollarSign,
  FileText,
  Hotel,
  LayoutDashboard, 
  Moon,
  Receipt,
  Search,
  ShoppingCart,
  Users,
  Wallet} from 'lucide-react';
import { useMemo } from "react";

import { NavLink } from "@/components/ui/NavLink";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/Sidebar"
import { Separator } from '@/components/ui/Separator';

// Front Desk Operations - most used
const frontDeskItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Reservations", url: "/reservation", icon: CalendarDays },
  { title: "Cashier", url: "/cashier", icon: Wallet },
  { title: "Rooms", url: "/rooms", icon: BedDouble },
];

// Guest Management
const guestItems = [
  { title: "Guests", url: "/guests", icon: Users },
  { title: "Guest Requests", url: "/guest-requests", icon: Bell },
  { title: "Lost & Found", url: "/lost-found", icon: Search },
];

// Finance & Operations
const operationsItems = [
  { title: "Deposits", url: "/deposits", icon: DollarSign },
  { title: "Night Audit", url: "/night-audit", icon: Moon },
  { title: "Services", url: "/services", icon: ShoppingCart },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const AppSidebar = () => {
  const { state } = useSidebar();

  const isCollapsed = useMemo(() => {
    return state === 'collapsed';
  }, [state]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500 text-primary-foreground">
            <Hotel className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">HotelHub</span>
              <span className="text-xs text-muted-foreground">Management</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {/* Front Desk Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Front Desk</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {frontDeskItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Guest Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Guest</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {guestItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Operation & Finance Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Operation & Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar