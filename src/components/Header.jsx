import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';

const Header = () => {
  const { t } = useTranslation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-secondary"
                  >
                    {item.icon}
                    <span>{t(item.title.toLowerCase())}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      <h1 className="text-xl font-bold">Database Analysis</h1>

      <Button onClick={() => setIsLoginOpen(true)} variant="ghost" size="icon">
        <User className="h-6 w-6" />
      </Button>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};

export default Header;
