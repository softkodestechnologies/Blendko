import React, { useState, useEffect } from 'react';
import { useTable, usePagination, Column } from 'react-table';
import styles from '../Admin.module.css';
import { FaPen, FaLock, FaTrash } from 'react-icons/fa';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  created: string;
}

const dummyData: Customer[] = [
  {
    id: '1',
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2024',
  },
  {
    id: '2',
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2024',
  },
  {
    id: '3',
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2024',
  },
  {
    id: '4',
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2024',
  },
  {
    id: '5',
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2024',
  },
  {
    id: '6',
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2024',
  },
];

const CustomerTable: React.FC = () => {
  const columns: Column<Customer>[] = React.useMemo(
    () => [
      {
        Header: '',
        id: 'avatar',
        Cell: () => (
          <div className={styles.avatarPlaceholder}></div>
        ),
      },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Phone Number', accessor: 'phone' },
      { Header: 'Created', accessor: 'created' },
      {
        Header: 'Action',
        id: 'actions',
        Cell: () => (
          <div className={styles.actionButtons}>
            <button title="Edit" className={styles.actionButton}><FaPen /></button>
            <button title="Lock" className={styles.actionButton}><FaLock /></button>
            <button title="Delete" className={styles.actionButton}><FaTrash /></button>
          </div>
        )
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Customer>(
    {
      columns,
      data: dummyData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.customerTable}>
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
          {page.map(row => {
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
      <div className={styles.pagination}>
        <div>
          <span>
            Show{' '}
            <select
              title="pageSize"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {' '}entries
          </span>
        </div>
        <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;

