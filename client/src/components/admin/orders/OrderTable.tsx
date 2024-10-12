import React, { useState, useEffect } from 'react';
import { useTable, useExpanded, Column, usePagination, Row, HeaderGroup, Cell } from 'react-table';
import styles from '../Admin.module.css';
import { FaEllipsisV, FaPrint, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '@/services/userService';
import useCustomerFilter from '@/utils/hooks/useCustomerFilter';

interface OrderItem {
  product: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
}

interface Order {
  _id: string;
  createdAt: string;
  user: {
    name: string;
  };
  totalPrice: number;
  profit: number;
  orderStatus: string;
  orderItems: OrderItem[];
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { filters, handleSearch } = useCustomerFilter();
  const { data: ordersData, isLoading, refetch } = useGetAllOrdersQuery(filters);
  
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (ordersData && ordersData.orders) {
      setOrders(ordersData.orders);
    }
  }, [ordersData]);

  const columns: Column<Order>[] = React.useMemo(
    () => [
      { Header: 'Order id', accessor: '_id' },
      { Header: 'Created', accessor: 'createdAt' },
      { Header: 'Customer', accessor: (row) => row.user.name },
      { Header: 'Total', accessor: 'totalPrice' },
      { Header: 'Profit', accessor: 'profit' },
      {
        Header: 'Status',
        accessor: 'orderStatus',
        Cell: ({ value, row }: { value: string; row: Row<Order> }) => (
          <select
            title="status"
            value={value}
            onChange={(e) => handleStatusChange(row.original._id, e.target.value)}
            className={`${styles.status} ${styles[value.toLowerCase()]}`}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        ),
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
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Order>(
    {
      columns,
      data: orders,
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      pageCount: ordersData?.total_pages || 0,
    } as any,
    useExpanded,
    usePagination
  );

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ body: { status: newStatus }, id: orderId }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const renderRowSubComponent = (row: Row<Order>) => {
    const { orderItems } = row.original;
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
            {orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{item.discount}%</td>
                <td>${item.total.toFixed(2)}</td>
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search orders..."
          onChange={(e) => handleSearch('keyword', e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <table {...getTableProps()} className={styles.orderTable}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<Order>) => (
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
          {page.map((row: Row<Order>) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: Cell<Order>) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
                {row.isExpanded && (
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
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                handleSearch('pp', e.target.value);
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{' '}
            entries
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

export default OrderTable;