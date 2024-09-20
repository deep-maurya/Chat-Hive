import { BookA, BookOpenTextIcon, FileTextIcon, HomeIcon, SettingsIcon, UserIcon } from "lucide-react";

export const  menuItems = {
    user: [
      { name: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
      { name: 'Lectures', icon: <FileTextIcon />, path: '/session' },
      { name: 'Profile', icon: <UserIcon />, path: '/profile' },
    ],
  };