import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';

import { useAuth } from '@/hooks/useAuth.hooks';
import { useHeaderNav } from '@/hooks/useHeaderNav.hooks';

import { BreadcrumbType } from '@/types/headerNav';

import AppSidebar from '../AppSidebar/AppSidebar';

const NAVBAR_ITEMS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    submenu: null,    
  },
  {
    name: 'Reservation',
    path: '/reservation',
    submenu: [
      {
        name: 'List Reservation',
        path: '/reservation/list',
      },
      {
        name: 'Guest In House',
        path: '/reservation/guest-in-house',
      },
    ],    
  },
  {
    name: 'Guest',
    path: '',
    submenu: [
      {
        name: 'Guest List',
        path: '/guest/guest-list',
      },
    ],     
  },
  {
    name: 'Reception',
    path: '/reception',
    submenu: null,    
  },
  {
    name: 'Report',
    path: '',
    submenu: [
      {
        name: 'Invoice Report',
        path: '/report/invoice-report',
      },
    ],     
  },
  {
    name: 'Cashier',
    path: '',
    submenu: [
      {
        name: 'Guest Account',
        path: '/cashier/guest-account',
      },
      {
        name: 'Batch Posting',
        path: '/cashier/batch-posting',
      },
      {
        name: 'Deposit',
        path: '/cashier/deposit',
      },
    ],     
  },
];

const AdminLayout = () => {
  // const { logout } = useAuth();

  const { title, breadcrumb, changeTitle, changeBreadcrumb } = useHeaderNav();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = useMemo(() => location.pathname, [location]);
  // const isActiveMenu = useCallback((path: string) => pathname.includes(path), [pathname]);
  const [open, setOpen] = useState<Record<string, boolean> | null>(null);

  useEffect(() => {
    changeTitle('Dashboard');
  }, []);

  useEffect(() => {
    const listPathname = pathname.split('/').slice(1, pathname.split('/').length);
    const hrefFunc = (index: number, listPathname: string[]) => {
      if (listPathname.length === 1) {
        return `/${listPathname[0]}`;
      }
      return listPathname.slice(0, index + 1).join('/');
    }

    const listBreadcrumb: BreadcrumbType[] = listPathname.map((item, index) => {
      return {
        title: item.charAt(0).toUpperCase() + item.slice(1),
        href: `/${hrefFunc(index, listPathname)}`,
        isCurrentPage: index === listPathname.length - 1
      }
    });

    changeBreadcrumb(listBreadcrumb);
  }, [pathname]);

  useEffect(() => {
    const openInit = NAVBAR_ITEMS.reduce((prev, curr) => ({
      ...prev,
      ...( curr.submenu !== null && {[curr.name.toLowerCase()]: true})
    }), {});

    setOpen(openInit);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main 
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as React.CSSProperties
        }
        className={`flex-1 flex flex-col bg-white border border-gray-200 rounded-l-2xl max-w-[calc(100vw_-_var(--sidebar-width))]`} id="main-content">
          <header className="sticky top-0 z-10 flex min-h-14 py-4 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="font-semibold text-2xl">{title ?? 'Admin Dashboard'}</h1>
              </div>
              {/* <Breadcrumb>
                <BreadcrumbList>
                  {
                    breadcrumb.map((item, index) => (
                      <>
                        <BreadcrumbItem key={index}>
                          {
                            item.isCurrentPage ? (
                              <BreadcrumbPage>{item.title}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                            ) 
                          }
                        </BreadcrumbItem>
                        {index < breadcrumb.length - 1 && <BreadcrumbSeparator /> }
                      </>
                    ))               
                  }
                </BreadcrumbList>
              </Breadcrumb> */}
            </div>
            <Popover>
              <PopoverTrigger className="ml-auto">
                <Avatar initial="A" className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-64 rounded-xl shadow bg-white p-4 border-gray-100 left-4" align="end">
                <div>
                  <header className="flex gap-2 mb-2 items-center">
                    <h2 className="text-2xl font-semibold">Admin</h2>
                    <p className="text-xs text-gray-400">Front Desk</p>
                  </header>
                  <div>
                    <h4 className="text-xs text-gray-600 mb-0">Shift</h4>
                    <p className="text-sm font-medium">Morning</p>
                  </div>
                  <Button className="w-full py-4 rounded-xl bg-red-700 text-white font-semibold mt-4">Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          </header>
          <section className='p-8 pr-12'>
            <Outlet />
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
