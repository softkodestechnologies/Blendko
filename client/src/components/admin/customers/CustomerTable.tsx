import React, { useMemo, useState } from 'react';
import { useTable, usePagination, Column } from 'react-table';
import styles from '../Admin.module.css';
import { useGetUsersQuery } from '@/services/userService';
import { formatDate } from '@/utils/helpers/dateUtils';
import useCustomerFilter from '@/utils/hooks/useCustomerFilter';
import { FaSearch } from 'react-icons/fa';
import CustomerModal from './CustomerModal';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  gender: string;
  dateOfBirth: string;
  memberSince: string;
  address: string;
  totalOrders: number;
  completedOrders: number;
  canceledOrders: number;
}

const CustomerTable: React.FC = () => {
  const { filters, handleSearch } = useCustomerFilter();
  const { data: usersData, isLoading, isError } = useGetUsersQuery(filters);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers: Customer[] = useMemo(() => usersData?.users || [], [usersData]);

  const columns: Column<Customer>[] = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'phone' },
      {
        Header: 'Created Date',
        accessor: 'createdAt',
        Cell: ({ value }) => formatDate(value),
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
      data: customers,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={filters.search || ''}
          onChange={(e) => handleSearch('search', e.target.value)}
        />
        <div>
          <FaSearch />
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <>
          <table {...getTableProps()} className={styles.customerTable}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    onClick={() => handleRowClick(row.original)}
                    className={styles.clickableRow}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.pagination}>
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
            <select
              title="pagination"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {selectedCustomer && (
        <CustomerModal customer={selectedCustomer} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CustomerTable;
