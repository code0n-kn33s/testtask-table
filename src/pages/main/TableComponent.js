import React from 'react';
import { Table } from 'antd';

const TableComponent = ({
  columns,
  dataSource,
  pageSize,
  setPageSize,
  selectedRowKeys,
  setSelectedRowKeys,
}) => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{
      pageSize,
      showSizeChanger: true,
      pageSizeOptions: ['5', '10', '20', '50'],
      onShowSizeChange: (current, size) => setPageSize(size),
    }}
    scroll={{ x: 'max-content' }}
    rowSelection={{
      selectedRowKeys,
      onChange: setSelectedRowKeys,
    }}
  />
);

export default TableComponent;
