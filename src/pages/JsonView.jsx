import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const JsonView = ({ data }) => {
  if (!data || !data.dependencies || data.dependencies.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Constraint Name</TableHead>
          <TableHead>Dependent Table</TableHead>
          <TableHead>Table</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.dependencies.map((dep, index) => (
          <TableRow key={index}>
            <TableCell>{dep.constraint_name}</TableCell>
            <TableCell>{dep.dependent_table}</TableCell>
            <TableCell>{dep.table}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JsonView;