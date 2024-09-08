import React from 'react';
import { Form, Input, Button, Select, DatePicker, Space, Checkbox } from 'antd';

const { Option } = Select;

const AdvancedSearchForm = () => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields(); // Сброс формы
  };

  const handleApplyFilters = (values) => {
    console.log('Примененные фильтры:', values);
    // Здесь можно добавить логику фильтрации данных
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleApplyFilters}
        initialValues={{
          paymentStatus: 'Дебет',
          returnStatus: false,
          returnAmount: '1300.00',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {/* Код банка плательщика */}
          <Form.Item name="payerBankCode" label="Код банку платника">
            <Input />
          </Form.Item>
          
          {/* Номер счета плательщика */}
          <Form.Item name="payerAccount" label="Рахунок платника">
            <Input />
          </Form.Item>

          {/* Код банка получателя */}
          <Form.Item name="recipientBankCode" label="Код банку одержувача">
            <Input />
          </Form.Item>
          
          {/* Номер счета получателя */}
          <Form.Item name="recipientAccount" label="Рахунок одержувача">
            <Input />
          </Form.Item>

          {/* Признак "Дебет/кредит" платежа */}
          <Form.Item name="paymentStatus" label="Ознака 'дебет/кредит' платежу">
            <Select>
              <Option value="Дебет">Дебет</Option>
              <Option value="Кредит">Кредит</Option>
            </Select>
          </Form.Item>

          {/* Сумма платежа */}
          <Form.Item name="paymentAmount" label="Сума платежу">
            <Input />
          </Form.Item>

          {/* Условный числовой код */}
          <Form.Item name="paymentCode" label="Умовний числовий код платіжної інструкції">
            <Input />
          </Form.Item>

          {/* Дата платежа */}
          <Form.Item name="paymentDate" label="Дата платіжної інструкції">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          {/* Валюта платежа */}
          <Form.Item name="currency" label="Валюта платежу">
            <Input />
          </Form.Item>

          {/* Идентификационный код плательщика */}
          <Form.Item name="payerId" label="Ідентифікаційний код платника">
            <Input />
          </Form.Item>

          {/* Идентификационный код получателя */}
          <Form.Item name="recipientId" label="Ідентифікаційний код одерж.">
            <Input />
          </Form.Item>

          {/* Дата возврата */}
          <Form.Item name="returnDate" label="Дата повернення">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          {/* Сумма возврата */}
          <Form.Item name="returnAmount" label="Сума повернення">
            <Input />
          </Form.Item>

          {/* Чекбокс "Повернуто отримувачу" */}
          <Form.Item name="returnStatus" valuePropName="checked">
            <Checkbox>Повернуто отримувачу</Checkbox>
          </Form.Item>
        </div>

        <Space>
          <Button type="primary" htmlType="submit">
            Застосувати фільтри
          </Button>
          <Button htmlType="button" onClick={handleReset}>
            Скинути все
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default AdvancedSearchForm;
