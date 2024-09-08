import React from 'react';
import { Popover, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const popoverContent = (
  <div>
    <p><strong>Дата та час останнього імпорту інформації від банку:</strong> 30/12/2023 15:00:30</p>
    <p><strong>Дата останнього банківського дня, за який отримано інформацію з банку:</strong> 29/12/2023</p>
    <p><strong>Розрахунковий залишок на рахунку:</strong> 1 234 432,95</p>
  </div>
);

const BankInfoPopover = () => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Popover content={popoverContent} title="Дані з банку" trigger="click">
        <Button icon={<InfoCircleOutlined />}>
          Дані з банку
        </Button>
      </Popover>
    </div>
  );
};

export default BankInfoPopover;
