export type BreadcrumbType = {
  title: string;
  href: string;
  isCurrentPage: boolean;
}

export type HeaderNavState = {
  title: string;
  breadcrumb: BreadcrumbType[];
  isLoading: boolean;
}

export type HeaderNavAction = {
  type: 'CHANGE_TITLE' | 'CHANGE_BREADCRUMB';
  payload?: Partial<HeaderNavState>;
};

export type HeaderNavContextType = HeaderNavState & {
  changeTitle: (title: string) => void;
  changeBreadcrumb: (breadcrumb: BreadcrumbType[]) => void;
};