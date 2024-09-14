import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const FileUpload = () => {
  const { t } = useTranslation();
  const [dbaTablesFile, setDbaTablesFile] = useState(null);
  const [dbaConstraintsFile, setDbaConstraintsFile] = useState(null);
  const [isUploadingTables, setIsUploadingTables] = useState(false);
  const [isUploadingConstraints, setIsUploadingConstraints] = useState(false);

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async (file, fileType, setIsUploading) => {
    if (!file) {
      toast.error(t('pleaseSelectFile', { fileType }));
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:9090/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success(t('uploadSuccess', { fileType }));
      } else {
        const errorData = await response.json();
        toast.error(t('uploadError', { error: errorData.error, fileType }));
      }
    } catch (error) {
      toast.error(t('uploadError', { error: error.message, fileType }));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('fileUpload')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">{t('dbaTablesFile')}</label>
          <div className="flex space-x-2">
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, setDbaTablesFile)}
              accept=".csv"
              className="flex-grow"
            />
            <Button 
              onClick={() => handleUpload(dbaTablesFile, t('dbaTablesFile'), setIsUploadingTables)}
              disabled={isUploadingTables}
            >
              {isUploadingTables ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t('upload')}
            </Button>
          </div>
        </div>
        <div>
          <label className="block mb-2">{t('dbaConstraintsFile')}</label>
          <div className="flex space-x-2">
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, setDbaConstraintsFile)}
              accept=".csv"
              className="flex-grow"
            />
            <Button 
              onClick={() => handleUpload(dbaConstraintsFile, t('dbaConstraintsFile'), setIsUploadingConstraints)}
              disabled={isUploadingConstraints}
            >
              {isUploadingConstraints ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {t('upload')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
