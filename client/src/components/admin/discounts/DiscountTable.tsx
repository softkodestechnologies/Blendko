import React from 'react';
import { useTable, useExpanded, usePagination, Column, Row, HeaderGroup, Cell, TableInstance } from 'react-table';
import styles from '../Admin.module.css';
import { FaPen, FaTrash } from 'react-icons/fa';

interface Discount {
  name: string;
  code: string;
  status: string;
  date: string;
  type: string;
  usage: string;
}

const dummyData: Discount[] = [
  {
    name: 'Summer discount 10% off Summer2020',
    code: 'XQQSL74HY9AH',
    status: 'Active',
    date: 'May 5, 2020 - May 15, 2020',
    type: 'Free shipping',
    usage: '1/200',
  },
  {
    name: 'Summer discount 10% off Summer2020',
    code: 'XQQSL74HY9AH',
    status: 'Active',
    date: 'May 5, 2020 - May 15, 2020',
    type: 'Free shipping',
    usage: '1/200',
  },
  {
    name: 'Summer discount 10% off Summer2020',
    code: 'XQQSL74HY9AH',
    status: 'Active',
    date: 'May 5, 2020 - May 15, 2020',
    type: 'Free shipping',
    usage: '1/200',
  },
  {
    name: 'Summer discount 10% off Summer2020',
    code: 'XQQSL74HY9AH',
    status: 'Active',
    date: 'May 5, 2020 - May 15, 2020',
    type: 'Free shipping',
    usage: '1/200',
  },
  {
    name: 'Summer discount 10% off Summer2020',
    code: 'XQQSL74HY9AH',
    status: 'Active',
    date: 'May 5, 2020 - May 15, 2020',
    type: 'Free shipping',
    usage: '1/200',
  },
];

const DiscountTable: React.FC = () => {
  const columns: Column<Discount>[] = React.useMemo(
    () => [
      { Header: 'Coupon Name', accessor: 'name' },
      { Header: 'Code', accessor: 'code' },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => (
          <span className={`${styles.status} ${styles[value.toLowerCase()]}`}>
            {value}
          </span>
        )
      },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Usage', accessor: 'usage' },
      {
        Header: 'Action',
        id: 'actions',
        Cell: () => (
          <div className={styles.actionButtons}>
            <button title="Edit" className={styles.actionButton}><FaPen /></button>
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
  } = useTable<Discount>(
    {
      columns,
      data: dummyData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.discountTable}>
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

export default DiscountTable;