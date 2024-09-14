import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from 'react-i18next';
import Mermaid from './Mermaid';
import JsonView from './JsonView';
import TreeView from './TreeView';

const fetchDependencies = async (owner, tableName, format) => {
  if (!owner || !tableName) {
    throw new Error('Owner and table_name are required');
  }
  const response = await fetch(`http://localhost:9090/dependencies?owner=${owner}&table_name=${tableName}&format=${format}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred while fetching data');
  }
  return await response.json();
};

const Dependencies = () => {
  const { t } = useTranslation();
  const [owner, setOwner] = useState('');
  const [tableName, setTableName] = useState('');
  const [format, setFormat] = useState('mermaid');
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dependencies', owner, tableName, format],
    queryFn: () => fetchDependencies(owner, tableName, format),
    enabled: shouldFetch,
    retry: false,
    onError: () => {
      setShouldFetch(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && tableName) {
      setShouldFetch(true);
    }
  };

  const renderVisualization = () => {
    if (!data) return null;

    switch (format) {
      case 'mermaid':
        return <Mermaid chart={data.mermaid} />;
      case 'json':
        return <JsonView data={data} />;
      case 'tree':
        return <TreeView data={data} />;
      default:
        return null;
    }
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
            required
          />
          <Input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder={t('tableName')}
            className="flex-grow"
            required
          />
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('selectFormat')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mermaid">{t('mermaid')}</SelectItem>
              <SelectItem value="json">{t('json')}</SelectItem>
              <SelectItem value="tree">{t('tree')}</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" disabled={!owner || !tableName}>{t('fetch')}</Button>
        </div>
      </form>

      {isLoading && <p>{t('loading')}</p>}
      {isError && <p className="text-red-500">{t('error')}: {error.message}</p>}
      {renderVisualization()}
    </div>
  );
};

export default Dependencies;
