import { useEffect, useState } from 'react';
import { Text } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { sortBy } from 'lodash';
import { ITransaction } from '../../types';

interface IProps {
  data: ITransaction[];
}

const TransactionsTable = ({ data }: IProps) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });
  const [records, setRecords] = useState(sortBy(data, 'name'));

  const columns = [
    {
      accessor: 'id',
      sortable: true,
    },
    {
      accessor: 'name',
      sortable: true,
    },
    {
      accessor: 'type',
      sortable: true,
    },
    {
      accessor: 'date',
      sortable: true,
    },
    {
      accessor: 'amount',
      sortable: true,
    },
    {
      accessor: 'status',
      sortable: true,
      render: ({ status }: ITransaction) => <Text>{status ? 'Accepted' : 'Declined'}</Text>,
    },
  ];

  useEffect(() => {
    const sortedData = sortBy(data || [], sortStatus.columnAccessor) as ITransaction[];
    setRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
  }, [data, sortStatus]);

  return (
    <DataTable
      columns={columns}
      records={records}
      minHeight={150}
      highlightOnHover
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      verticalSpacing="md"
    />
  );
};

export default TransactionsTable;
