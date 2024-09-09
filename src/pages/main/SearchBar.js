import React from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchBar = ({ searchText, handleSearch, filterStatus, handleStatusChange }) => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Input
      placeholder="Поиск..."
      value={searchText}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ width: 200 }}
      allowClear
      suffix={<SearchOutlined />}
    />
    <Select
      defaultValue="Всі"
      onChange={handleStatusChange}
      value={filterStatus}
      style={{ width: 200 }}
    >
      <Option value="Всі">Всі</Option>
      <Option value="Очікує публікації">Очікує публікації</Option>
      <Option value="Опубліковано">Опубліковано</Option>
    </Select>
  </div>
);

export default SearchBar;
