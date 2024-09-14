import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const JsonView = ({ data }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!data || !data.dependencies) return [];
    return data.dependencies.filter(dep =>
      Object.values(dep).some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!data || !data.dependencies || data.dependencies.length === 0) {
    return <p>{t('noDataAvailable')}</p>;
  }

  return (
    <div>
      <Input
        type="text"
        placeholder={t('search')}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('constraintName')}</TableHead>
            <TableHead>{t('dependentTable')}</TableHead>
            <TableHead>{t('table')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((dep, index) => (
            <TableRow key={index}>
              <TableCell>{dep.constraint_name}</TableCell>
              <TableCell>{dep.dependent_table}</TableCell>
              <TableCell>{dep.table}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>
          {t('page')} {currentPage} {t('of')} {totalPages}
        </div>
        <div>
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mr-2"
          >
            {t('previous')}
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {t('next')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JsonView;
