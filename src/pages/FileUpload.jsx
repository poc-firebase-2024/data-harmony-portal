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

  const handleUpload = async () => {
    if (!dbaTablesFile || !dbaConstraintsFile) {
      toast.error(t('pleaseSelectBothFiles'));
      return;
    }

    // For now, we're only uploading DBA_CONSTRAINTS
    const formData = new FormData();
    formData.append('file', dbaConstraintsFile);

    try {
      const response = await fetch('http://localhost:9090/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success(t('uploadSuccess'));
      } else {
        const errorData = await response.json();
        toast.error(t('uploadError', { error: errorData.error }));
      }
    } catch (error) {
      toast.error(t('uploadError', { error: error.message }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('fileUpload')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">{t('dbaTablesFile')}</label>
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, setDbaTablesFile)}
            accept=".csv"
          />
        </div>
        <div>
          <label className="block mb-2">{t('dbaConstraintsFile')}</label>
          <Input
            type="file"
            onChange={(e) => handleFileChange(e, setDbaConstraintsFile)}
            accept=".csv"
          />
        </div>
        <Button onClick={handleUpload}>{t('upload')}</Button>
      </div>
    </div>
  );
};

export default FileUpload;