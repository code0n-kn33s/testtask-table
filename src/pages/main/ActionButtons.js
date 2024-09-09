import React from 'react';
import { Button, Dropdown, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Option } = Select;

const ActionButtons = ({
  setIsSearchModalVisible,
  handleGroupAction,
  handleExportToCSV,
  menu,
}) => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Select
      placeholder="Обрати групові дії"
      style={{ width: 200 }}
      onChange={handleGroupAction}
    >
      <Option value="confirm">Підтвердити банківські операції</Option>
      <Option value="remove">Зняти підтвердження</Option>
    </Select>
    <Button onClick={() => setIsSearchModalVisible(true)}>
      Розширений пошук
    </Button>
    <Button onClick={handleExportToCSV}>Завантажити CSV</Button>
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Обрати колонки <DownOutlined />
      </Button>
    </Dropdown>
  </div>
);

export default ActionButtons;
