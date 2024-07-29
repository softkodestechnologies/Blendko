import React, { useState } from 'react';
import { useTable, useExpanded, usePagination, Column, Row, HeaderGroup, Cell, TableInstance } from 'react-table';
import styles from '../Admin.module.css';
import { FaEllipsisV, FaPrint, FaChevronDown, FaChevronRight } from 'react-icons/fa';

interface Order {
  id: string;
  created: string;
  customer: string;
  total: string;
  profit: string;
  status: string;
  details: {
    sku: string;
    name: string;
    price: string;
    qty: number;
    disc: string;
    total: string;
  }[];
}

const dummyData: Order[] = [
  {
    id: '#6548',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
    details: [
      { sku: 'SKU001', name: 'Product 1', price: '$100', qty: 2, disc: '10%', total: '$180' },
      { sku: 'SKU002', name: 'Product 2', price: '$200', qty: 1, disc: '5%', total: '$190' },
    ],
  },
  {
    id: '#6549',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
    details: [
      { sku: 'SKU001', name: 'Product 1', price: '$100', qty: 2, disc: '10%', total: '$180' },
      { sku: 'SKU002', name: 'Product 2', price: '$200', qty: 1, disc: '5%', total: '$190' },
    ],
  },
  {
    id: '#6550',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
    details: [
      { sku: 'SKU001', name: 'Product 1', price: '$100', qty: 2, disc: '10%', total: '$180' },
      { sku: 'SKU002', name: 'Product 2', price: '$200', qty: 1, disc: '5%', total: '$190' },
    ],
  },
  {
    id: '#6551',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
    details: [
      { sku: 'SKU001', name: 'Product 1', price: '$100', qty: 2, disc: '10%', total: '$180' },
      { sku: 'SKU002', name: 'Product 2', price: '$200', qty: 1, disc: '5%', total: '$190' },
    ],
  },
  {
    id: '#6552',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
    details: [
      { sku: 'SKU001', name: 'Product 1', price: '$100', qty: 2, disc: '10%', total: '$180' },
      { sku: 'SKU002', name: 'Product 2', price: '$200', qty: 1, disc: '5%', total: '$190' },
    ],
  },
  {
    id: '#6553',
    created: '2 min ago',
    customer: 'Joseph Wheeler',
    total: '$654',
    profit: '$154',
    status: 'Pending',
    details: [
      { sku: 'SKU001', name: 'Product 1', price: '$100', qty: 2, disc: '10%', total: '$180' },
      { sku: 'SKU002', name: 'Product 2', price: '$200', qty: 1, disc: '5%', total: '$190' },
    ],
  },
];

const OrderTable: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns: Column<Order>[] = React.useMemo(
    () => [
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
        id: 'expander',
        Cell: ({ row }: { row: Row<Order> }) => (
          <span {...row.getToggleRowExpandedProps?.()}>
            {row.isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        ),
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
    setPageSize: setReactTablePageSize,
    state: { pageIndex: statePageIndex, pageSize: statePageSize },
  } = useTable<Order>(
    {
      columns,
      data: dummyData,
      initialState: { pageIndex, pageSize } as any,
    },
    useExpanded,
    usePagination
  );

  const renderRowSubComponent = (row: Row<Order>) => {
    const { details } = row.original;
    return (
      <div className={styles.expandedRow}>
        <table className={styles.detailsTable}>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Disc.</th>
              <th>Total</th>
              <th><FaPrint /> Print</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>

                <td>{item.qty}</td>
                <td>{item.disc}</td>
                <td>{item.total}</td>
                <td>
                  <button type="button" title="button" className={styles.actionButton}>
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.orderTable}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<Order>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: Row<Order>) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: Cell<Order>) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>{cell.render('Cell')}</td>
                  ))}
                </tr>
                {(row as any).isExpanded && (
                  <tr>
                    <td colSpan={columns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
              value={statePageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
                setReactTablePageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
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
              {statePageIndex + 1} of {pageOptions.length}
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

export default OrderTable;
