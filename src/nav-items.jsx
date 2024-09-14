import { HomeIcon, DatabaseIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Dependencies from "./pages/Dependencies.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Dependencies",
    to: "/dependencies",
    icon: <DatabaseIcon className="h-4 w-4" />,
    page: <Dependencies />,
  },
];
