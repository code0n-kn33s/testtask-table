import React, { useState } from 'react';
import { Table, Checkbox, Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// Пример данных для таблицы
const data = [
  { key: '1', number: '345678', purpose: '+2500; перерахування', status: 'Ожидает', amount: '234455.55', payer: 'John Brown' },
  { key: '2', number: '123456', purpose: '+2500; перерахування', status: 'Подтверждено', amount: '765332.11', payer: 'John Brown' },
  // остальные данные
];

const columnsTemplate = [
  { title: '№', dataIndex: 'number', key: 'number' },
  { title: 'Призначення платежу', dataIndex: 'purpose', key: 'purpose' },
  { title: 'Статус обробки', dataIndex: 'status', key: 'status' },
  { title: 'Сума операції', dataIndex: 'amount', key: 'amount' },
  { title: 'Платник', dataIndex: 'payer', key: 'payer' },
  // Добавьте больше колонок по необходимости
];

const App = () => {
  const [selectedColumns, setSelectedColumns] = useState(['number', 'purpose', 'status', 'amount', 'payer']);

  const handleColumnChange = (column) => {
    setSelectedColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((col) => col !== column);
      } else {
        return [...prev, column];
      }
    });
  };

  const menu = (
    <Menu>
      {columnsTemplate.map((col) => (
        <Menu.Item key={col.key}>
          <Checkbox
            checked={selectedColumns.includes(col.key)}
            onChange={() => handleColumnChange(col.key)}
          >
            {col.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const filteredColumns = columnsTemplate.filter((col) => selectedColumns.includes(col.key));

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          Выбрать колонки <DownOutlined />
        </Button>
      </Dropdown>
      <Table columns={filteredColumns} dataSource={data} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default App;
