import React from 'react';

const TreeView = ({ data }) => {
  if (!data || !data.dependencies || data.dependencies.length === 0) {
    return <p>No data available</p>;
  }

  const renderTree = (dependencies) => {
    return (
      <ul className="pl-4">
        {dependencies.map((dep, index) => (
          <li key={index} className="mb-2">
            <strong>{dep.table}</strong>
            <ul className="pl-4">
              <li>Constraint: {dep.constraint_name}</li>
              <li>Dependent Table: {dep.dependent_table}</li>
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Dependency Tree</h3>
      {renderTree(data.dependencies)}
    </div>
  );
};

export default TreeView;