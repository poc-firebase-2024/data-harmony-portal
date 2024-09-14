import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Mail, Facebook, Apple } from "lucide-react";
import { useTranslation } from 'react-i18next';

const LoginPopup = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('login')}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Button variant="outline"><Github className="mr-2 h-4 w-4" /> {t('loginWithGithub')}</Button>
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> {t('loginWithGoogle')}</Button>
          <Button variant="outline"><Facebook className="mr-2 h-4 w-4" /> {t('loginWithFacebook')}</Button>
          <Button variant="outline"><Apple className="mr-2 h-4 w-4" /> {t('loginWithApple')}</Button>
          <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> {t('loginWithEmail')}</Button>
          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">{t('forgotPassword')}</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-sm text-blue-600 hover:underline">{t('signUp')}</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;