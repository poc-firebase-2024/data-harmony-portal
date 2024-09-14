import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FileUpload = () => {
  const { t } = useTranslation();
  const [dbaTablesFile, setDbaTablesFile] = useState(null);
  const [dbaConstraintsFile, setDbaConstraintsFile] = useState(null);

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async (file, fileType) => {
    if (!file) {
      toast.error(t('pleaseSelectFile', { fileType }));
      return;
    }

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
            <Button onClick={() => handleUpload(dbaTablesFile, t('dbaTablesFile'))}>{t('upload')}</Button>
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
            <Button onClick={() => handleUpload(dbaConstraintsFile, t('dbaConstraintsFile'))}>{t('upload')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
