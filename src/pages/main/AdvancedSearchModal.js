import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Space } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdvancedSearchModal = ({
  isSearchModalVisible,
  setIsSearchModalVisible,
  handleApplyFilters,
  handleResetFilters,
  form
}) => (
  <Modal
    title="Розширений пошук"
    visible={isSearchModalVisible}
    onCancel={() => setIsSearchModalVisible(false)}
    footer={null}
  >
    <Form form={form} layout="vertical" onFinish={handleApplyFilters}>
      <Form.Item name="payer" label="Платник">
        <Input />
      </Form.Item>
      <Form.Item name="status" label="Статус обробки">
        <Select>
          <Option value="Очікує підтвердження">Очікує підтвердження</Option>
          <Option value="Підтверджено">Підтверджено</Option>
        </Select>
      </Form.Item>
      <Form.Item name="dateRange" label="Дата">
        <RangePicker format="DD/MM/YYYY" />
      </Form.Item>
      <Space>
        <Button type="primary" htmlType="submit">
          Застосувати фільтри
        </Button>
        <Button onClick={handleResetFilters}>Скинути все</Button>
      </Space>
    </Form>
  </Modal>
);

export default AdvancedSearchModal;
