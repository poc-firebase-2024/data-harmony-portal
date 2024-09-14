import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import Mermaid from './Mermaid';

const fetchDependencies = async (owner, tableName) => {
  const response = await fetch(`http://localhost:9090/dependencies?owner=${owner}&table_name=${tableName}&format=mermaid`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.mermaid;
};

const Dependencies = () => {
  const { t } = useTranslation();
  const [owner, setOwner] = useState('');
  const [tableName, setTableName] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dependencies', owner, tableName],
    queryFn: () => fetchDependencies(owner, tableName),
    enabled: shouldFetch,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldFetch(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('dependencies')}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder={t('owner')}
            className="flex-grow"
          />
          <Input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder={t('tableName')}
            className="flex-grow"
          />
          <Button type="submit">{t('fetch')}</Button>
        </div>
      </form>

      {isLoading && <p>{t('loading')}</p>}
      {isError && <p>{t('error')}: {error.message}</p>}
      {data && <Mermaid chart={data} />}
    </div>
  );
};

export default Dependencies;
