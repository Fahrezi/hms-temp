export interface MockUser {
  id: string;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    role: 'admin' | 'front-desk' | 'manager' | 'housekeeping';
    avatarUrl?: string;
  };
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'admin@hotelhub.com',
    password: 'admin123',
    profile: {
      firstName: 'John',
      lastName: 'Admin',
      role: 'admin',
    }
  },
  {
    id: '2',
    email: 'staff@hotelhub.com',
    password: 'staff123',
    profile: {
      firstName: 'Sarah',
      lastName: 'Miller',
      role: 'front-desk',
    }
  },
  {
    id: '3',
    email: 'manager@hotelhub.com',
    password: 'manager123',
    profile: {
      firstName: 'Michael',
      lastName: 'Chen',
      role: 'manager',
    }
  },
];
