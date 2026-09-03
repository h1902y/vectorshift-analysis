import React from 'react';

/**
 * LedgerTable - Disciplined financial/technical data ledger table
 */
export function LedgerTable({ 
  columns, 
  data, 
  style = {},
  striped = false,
  compact = false
}) {
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table 
        className="diff-table" 
        style={{
          margin: compact ? '0.5rem 0' : '1.2rem 0',
          ...style
        }}
      >
        <thead>
          <tr>
            {columns.map(col => (
              <th 
                key={col.key} 
                style={{ 
                  textAlign: col.align || 'left',
                  width: col.width || 'auto',
                  padding: compact ? '0.45rem 0.6rem' : '0.65rem 0.8rem'
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', color: 'var(--ink-muted)', padding: '1.5rem' }}>
                No records recorded in ledger.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr 
                key={idx}
                style={striped && idx % 2 === 1 ? { background: 'rgba(0, 0, 0, 0.02)' } : {}}
              >
                {columns.map(col => (
                  <td 
                    key={col.key} 
                    style={{ 
                      textAlign: col.align || 'left', 
                      padding: compact ? '0.45rem 0.6rem' : '0.7rem 0.8rem',
                      ...col.cellStyle 
                    }}
                  >
                    {col.render ? col.render(row[col.key], row, idx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
