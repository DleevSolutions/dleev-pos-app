import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import type { NavigationTab } from '@types';
import { ROUTES } from '../global/route';
import type { ItemProps } from '@containers/layouts/Header/components/NavigationDrawer/components/MenuItem';

export const navTabs: NavigationTab[] = [
  { title: 'header.dashboard', path: `/${ROUTES.main}`, permission: 'dashboard' },
  { title: 'header.orders', path: `/${ROUTES.orders}`, permission: 'orders' },
  { title: 'header.products', path: `/${ROUTES.products}`, permission: 'products' },
  { title: 'header.reports', path: `/${ROUTES.reports}`, permission: 'reports' },
  { title: 'header.controlPanel', path: `/${ROUTES.controlPanel}`, permission: 'controlPanel' },
];

export const drawerMenuItems: ItemProps[] = [
  {
    id: '1',
    name: 'header.dashboard',
    isOpen: false,
    link: `/${ROUTES.main}`,
    icon: GroupsOutlinedIcon,
    permission: 'dashboard',
  },
  {
    id: '2',
    name: 'header.orders',
    isOpen: false,
    link: `/${ROUTES.orders}`,
    icon: CalendarMonthOutlinedIcon,
    permission: 'orders',
  },
  {
    id: '3',
    name: 'header.products',
    isOpen: false,
    link: `/${ROUTES.products}`,
    icon: ScienceOutlinedIcon,
    permission: 'products',
  },
  {
    id: '4',
    name: 'header.reports',
    isOpen: false,
    link: `/${ROUTES.reports}`,
    icon: PrintOutlinedIcon,
    permission: 'reports',
  },
  {
    id: '5',
    name: 'header.controlPanel',
    isOpen: false,
    link: `/${ROUTES.controlPanel}`,
    icon: SettingsOutlinedIcon,
    permission: 'controlPanel',
  },
];
