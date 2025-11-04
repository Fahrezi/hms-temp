import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { useHeaderNav } from '@/hooks/useHeaderNav';

import { CircleUser } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/Breadcrumb';
import { BreadcrumbType } from '@/types/headerNav';
import { cn } from '@/libs/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';

const NAVBAR_ITEMS = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    submenu: null,    
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
    name: 'Reservation',
    path: '/reservation',
    submenu: [
      {
        name: 'List Reservation',
        path: '/reservation/list-reservation',
      },
      {
        name: 'Guest In House',
        path: '/reservation/guest-in-house',
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
]

const AdminLayout = () => {
  const { logout } = useAuth();
  const { title, breadcrumb, changeTitle, changeBreadcrumb } = useHeaderNav();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = useMemo(() => location.pathname, [location]);
  const isActiveMenu = useCallback((path: string) => pathname.includes(path), [pathname]);

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

  return (
    <div className="w-full max-w-[100vw] mx-auto">
      <div className="grid grid-cols-[248px_minmax(0,1fr)] w-screen relative">
        <nav className="p-4 h-screen bg-[#FCFBFB] w-[248px] fixed z-20">
          <div aria-label="logo" className="mb-8">
            <img src="/images/logo.png" alt="logo" className="w-[60%] h-auto" />
          </div>
          <ul className="flex flex-col gap-4">
            {
              NAVBAR_ITEMS.map((item, index) => (
                item.submenu === null ? (
                  <li key={index} className={cn("mb-4 rounded-xl", isActiveMenu(item.path) && 'bg-hotel-sage-whisper py-2 px-4 text-green-900 font-medium')}><Link to={item.path}>{item.name}</Link></li>
                ) : (
                  <li key={index}>
                    <div className="flex items-center justify-between cursor-pointer mb-4">
                      <span className="text-sm font-semibold">{item.name}</span>
                    </div>
                      <ul className="pl-4 flex flex-col gap-4 mb-4">
                        {
                          item.submenu.map((subitem, subindex) => (
                            <li className={cn("rounded-xl", isActiveMenu(subitem.path) && 'bg-hotel-sage-whisper  py-2 px-4 text-green-900 font-medium')} key={subindex}>
                              <Link to={subitem.path}>{subitem.name}</Link>
                            </li>
                          ))
                        }
                      </ul>
                  </li>
                )
              ))
            }
          </ul>
        </nav>
        <div className="opacity-0 w-[248px]">
          halo
        </div>
        <main className="bg-white min-w-0 overflow-auto min-h-screen border border-gray-200 rounded-l-2xl" id="main-content">
          <header className="flex justify-between items-start p-8 pr-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {/* {breadcrumb.length > 1 && (
                  <button className="cursor-pointer" onClick={() => navigate(breadcrumb[breadcrumb.length - 2].href)}>
                    <ArrowLeft size={24} />
                  </button>
                )} */}
                <h1 className="font-semibold text-2xl">{title ?? 'Admin Dashboard'}</h1>
              </div>
              <Breadcrumb>
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
              </Breadcrumb>
            </div>
            <Popover>
              <PopoverTrigger>
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
    </div>
  );
};

export default AdminLayout;
