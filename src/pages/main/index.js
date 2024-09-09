import React, { useState, useRef } from 'react';
import { message, Menu, Checkbox, Form } from 'antd';
import * as XLSX from 'xlsx';
import moment from 'moment';
import SearchBar from './SearchBar';
import ActionButtons from './ActionButtons';
import TableComponent from './TableComponent';
import GroupActionModal from './GroupActionModal';
import AdvancedSearchModal from './AdvancedSearchModal';
import Highlighter from 'react-highlight-words';
import { Space } from 'antd';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([
    "number", "purpose", "status", "amount", "payer", "date", "publicationStatus"
  ]);
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [data, setData] = useState(initialData);
  const [pageSize, setPageSize] = useState(10);
  const searchInput = useRef(null);
  const [form] = Form.useForm();

  const handleSearch = (value) => setSearchText(value);
  const handleReset = () => setSearchText('');
  const handleStatusChange = (value) => setFilterStatus(value);
  const handleApplyFilters = (values) => {
    setDateRange(values.dateRange);
    setAdvancedFilters(values);
    setIsSearchModalVisible(false);
  };
  const handleResetFilters = () => {
    form.resetFields();
    setDateRange(null);
    setAdvancedFilters({});
  };
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

  const filteredData = data.filter((item) => {
    if (filterStatus !== 'Всі' && item.publicationStatus !== filterStatus) {
      return false;
    }
    if (advancedFilters.payer && !item.payer.toLowerCase().includes(advancedFilters.payer.toLowerCase())) {
      return false;
    }
    if (advancedFilters.status && item.status !== advancedFilters.status) {
      return false;
    }
    if (dateRange) {
      const itemDate = moment(item.date, 'YYYY-MM-DD');
      const startDate = moment(dateRange[0]);
      const endDate = moment(dateRange[1]);
      if (!(itemDate.isBetween(startDate, endDate, undefined, '[]'))) {
        return false;
      }
    }
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

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

  const columnsTemplate = [
    { title: 'Номер', dataIndex: 'number', key: 'number', ...getColumnSearchProps('number') },
    { title: 'Призначення платежу', dataIndex: 'purpose', key: 'purpose', ...getColumnSearchProps('purpose') },
    { title: 'Статус обробки', dataIndex: 'status', key: 'status', ...getColumnSearchProps('status') },
    { title: 'Сума операції', dataIndex: 'amount', key: 'amount', ...getColumnSearchProps('amount') },
    { title: 'Платник', dataIndex: 'payer', key: 'payer', ...getColumnSearchProps('payer') },
    { title: 'Дата', dataIndex: 'date', key: 'date', ...getColumnSearchProps('date') },
    { title: 'Статус публікації', dataIndex: 'publicationStatus', key: 'publicationStatus', ...getColumnSearchProps('publicationStatus') },
  ];

  const filteredColumns = columnsTemplate.filter((col) => selectedColumns.includes(col.key));

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
        <SearchBar
          searchText={searchText}
          handleSearch={handleSearch}
          filterStatus={filterStatus}
          handleStatusChange={handleStatusChange}
        />
        <ActionButtons
          setIsSearchModalVisible={setIsSearchModalVisible}
          handleGroupAction={handleGroupAction}
          handleExportToCSV={handleExportToCSV}
          menu={menu}
        />
      </Space>
      <TableComponent
        columns={filteredColumns}
        dataSource={filteredData}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <GroupActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleConfirmAction={handleConfirmAction}
        pendingAction={pendingAction}
      />
      <AdvancedSearchModal
        isSearchModalVisible={isSearchModalVisible}
        setIsSearchModalVisible={setIsSearchModalVisible}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
        form={form}
      />
    </div>
  );
};

export default App;
