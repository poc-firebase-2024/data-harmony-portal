import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useTranslation } from 'react-i18next';
import LoginPopup from './LoginPopup';

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
            <ul>
              <li><a href="/">{t('home')}</a></li>
              <li><a href="/dependencies">{t('dependencies')}</a></li>
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