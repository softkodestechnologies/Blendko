import React from 'react';
import { useTable, Column } from 'react-table';
import styles from '../Admin.module.css';
import { FaEllipsisV } from 'react-icons/fa';

// Define the interface for our data structure
interface Order {
  id: string;
  created: string;
  customer: string;
  total: string;
  profit: string;
  status: string;
}

// Sample data
const dummyData: Order[] = [
  {
    id: '#6548',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
  },
  // Add more dummy data here
];

// Define columns
const columns: Column<Order>[] = [
  { Header: 'Order id', accessor: 'id' },
  { Header: 'Created', accessor: 'created' },
  { Header: 'Customer', accessor: 'customer' },
  { Header: 'Total', accessor: 'total' },
  { Header: 'Profit', accessor: 'profit' },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }: { value: string }) => (
      <span className={`${styles.status} ${styles[value.toLowerCase()]}`}>
        {value}
      </span>
    )
  },
  {
    Header: '',
    id: 'actions',
    Cell: () => (
      <button type="button" title="button" className={styles.actionButton}>
        <FaEllipsisV />
      </button>
    )
  },
];

const OrderTable: React.FC = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<Order>({ columns, data: dummyData });

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.orderTable}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;