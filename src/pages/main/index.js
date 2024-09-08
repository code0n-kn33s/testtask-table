import React, { useRef, useState } from 'react';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select, Modal, Form, DatePicker, Dropdown, Menu, Checkbox, message } from 'antd';
import Highlighter from 'react-highlight-words';
import * as XLSX from 'xlsx'; // Для выгрузки CSV
import moment from 'moment'; // Для работы с датами

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Item: MenuItem } = Menu;

const initialData = [];
for (let i = 1; i <= 30; i++) {
  initialData.push({
    key: i.toString(),
    number: i.toString().padStart(6, '0'),
    purpose: `+2500; перерахування коштів...`,
    status: i % 2 === 0 ? "Підтверджено" : "Очікує підтвердження",
    amount: (Math.random() * 100000).toFixed(2),
    payer: `Payer ${i}`,
    date: `2024-11-${(i % 30 + 1).toString().padStart(2, '0')}`,
    publicationStatus: i % 2 === 0 ? "Опубліковано" : "Очікує публікації",
  });
}

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('Всі');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Для подтверждения групповых действий
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false); // Для расширенного поиска
  const [dateRange, setDateRange] = useState(null); // Диапазон для расширенного поиска по дате
  const [pendingAction, setPendingAction] = useState(null); // Действие для подтверждения
  const [selectedColumns, setSelectedColumns] = useState([
    "number", "purpose", "status", "amount", "payer", "date", "publicationStatus"
  ]); // Выбор колонок
  const [advancedFilters, setAdvancedFilters] = useState({}); // Дополнительные фильтры
  const [data, setData] = useState(initialData); // Данные таблицы
  const [pageSize, setPageSize] = useState(10); // Количество строк на странице
  const searchInput = useRef(null);
  const [form] = Form.useForm();

  // Поиск по всем столбцам
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Сброс поиска
  const handleReset = () => {
    setSearchText('');
  };

  // Фильтрация по статусу публикации
  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  // Применение фильтрации по расширенному поиску (платник, статус, дата)
  const handleApplyFilters = (values) => {
    setDateRange(values.dateRange);
    setAdvancedFilters(values);
    setIsSearchModalVisible(false);
  };

  // Сброс фильтров
  const handleResetFilters = () => {
    form.resetFields();
    setDateRange(null);
    setAdvancedFilters({});
  };

  // Применение групповых действий
  const handleGroupAction = (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Выберите хотя бы одну строку для выполнения действия");
      return;
    }
    setPendingAction(action);
    setIsModalVisible(true);
  };

  const handleConfirmAction = () => {
    setData((prevData) =>
      prevData.map((item) => {
        if (selectedRowKeys.includes(item.key)) {
          return {
            ...item,
            status:
              pendingAction === 'confirm'
                ? 'Підтверджено'
                : 'Очікує підтвердження',
          };
        }
        return item;
      })
    );
    message.success(
      `Действие "${pendingAction === 'confirm' ? 'Підтверджено' : 'Знято підтвердження'}" применено к ${selectedRowKeys.length} строкам`
    );
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  // Фильтрация данных на основе всех критериев
  const filteredData = data.filter((item) => {
    // Фильтрация по статусу публикации
    if (filterStatus !== 'Всі' && item.publicationStatus !== filterStatus) {
      return false;
    }

    // Фильтрация по расширенным фильтрам (платник, статус обработки)
    if (advancedFilters.payer && !item.payer.toLowerCase().includes(advancedFilters.payer.toLowerCase())) {
      return false;
    }

    if (advancedFilters.status && item.status !== advancedFilters.status) {
      return false;
    }

    // Фильтрация по диапазону дат
    if (dateRange) {
      const itemDate = moment(item.date, 'YYYY-MM-DD');
      const startDate = moment(dateRange[0]);
      const endDate = moment(dateRange[1]);

      if (!(itemDate.isBetween(startDate, endDate, undefined, '[]'))) {
        return false;
      }
    }

    // Фильтрация по поисковому запросу
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Логика для подсветки текста в колонках при поиске
  const getColumnSearchProps = (dataIndex) => ({
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ),
  });

  // Формирование колонок на основе выбора
  const columnsTemplate = [
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      ...getColumnSearchProps('number'),
    },
    {
      title: 'Призначення платежу',
      dataIndex: 'purpose',
      key: 'purpose',
      ...getColumnSearchProps('purpose'),
    },
    {
      title: 'Статус обробки',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
    },
    {
      title: 'Сума операції',
      dataIndex: 'amount',
      key: 'amount',
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'Платник',
      dataIndex: 'payer',
      key: 'payer',
      ...getColumnSearchProps('payer'),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Статус публікації',
      dataIndex: 'publicationStatus',
      key: 'publicationStatus',
      ...getColumnSearchProps('publicationStatus'),
    },
  ];

  const filteredColumns = columnsTemplate.filter((col) =>
    selectedColumns.includes(col.key)
  );

  // Выгрузка данных в CSV
  const handleExportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Таблица");
    XLSX.writeFile(wb, "table_data.csv");
  };

  const menu = (
    <Menu>
      {columnsTemplate.map((col) => (
        <MenuItem key={col.key}>
          <Checkbox
            checked={selectedColumns.includes(col.key)}
            onChange={() =>
              setSelectedColumns((prev) =>
                prev.includes(col.key)
                  ? prev.filter((key) => key !== col.key)
                  : [...prev, col.key]
              )
            }
          >
            {col.title}
          </Checkbox>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div>
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', width: '100%', padding: 10, alignItems: 'center', flexWrap: 'wrap'}}>
        {/* Поле для глобального поиска по всем столбцам */}
        <Input
          placeholder="Поиск..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
          allowClear
          suffix={<SearchOutlined />}
        />

        {/* Фильтр по статусу публикации */}
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

        {/* Групповые действия */}
        <Select
          placeholder="Обрати групові дії"
          style={{ width: 200 }}
          onChange={handleGroupAction}
        >
          <Option value="confirm">Підтвердити банківські операції</Option>
          <Option value="remove">Зняти підтвердження</Option>
        </Select>

        {/* Кнопка для расширенного поиска */}
        <Button onClick={() => setIsSearchModalVisible(true)}>
          Розширений пошук
        </Button>

        {/* Выгрузка в CSV */}
        <Button onClick={handleExportToCSV}>Завантажити CSV</Button>

        {/* Настройка колонок */}
        <Dropdown overlay={menu} trigger={['click']}>
          <Button>
            Выбрать колонки <DownOutlined />
          </Button>
        </Dropdown>
      </Space>

      {/* Таблица с отфильтрованными данными */}
      <Table
        columns={filteredColumns}
        dataSource={filteredData}
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

      {/* Модальное окно для подтверждения групповых действий */}
      <Modal
        title="Підтвердити групову дію"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleConfirmAction}
      >
        <p>Вы уверены, что хотите {pendingAction === 'confirm' ? 'підтвердити' : 'зняти підтвердження'} для выбранных строк?</p>
      </Modal>

      {/* Модальное окно для расширенного поиска */}
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
    </div>
  );
};

export default App;
