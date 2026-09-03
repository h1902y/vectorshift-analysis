import React from 'react';

export function LedgerTable({ columns, data, style = {} }) {
  return (
    <table className="diff-table" style={style}>
      <thead>
        <tr>
          {columns.map(col => (
            <th 
              key={col.key} 
              style={{ textAlign: col.align || 'left' }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map(col => (
              <td 
                key={col.key} 
                style={{ textAlign: col.align || 'left', ...col.cellStyle }}
              >
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
