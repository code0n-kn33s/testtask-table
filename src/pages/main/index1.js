import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypes,
  getDevices,
  getModels,
  getMotos,
  clearData,
  getYears,
  getRozborka,
} from "../../toolkitReducers";

import { CardRozborka } from "../../library";
import SelectDetails from "./SelectDetails";
import { AsyncModalDevice } from "./asyncModalDevice";

import { Space, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import moto from "../../assets/images/sl1.png";

export default function DetailsPage(props) {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editValueTab, setValueTab] = useState("");
  const [isImageTab, setImageTab] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [activeType, setActiveType] = useState(null);
  const [activeMoto, setActiveMoto] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  const [detailType, setDetailType] = useState("new");

  const motos = useSelector(({ state }) => state.motos);
  const types = useSelector(({ state }) => state.types);
  const models = useSelector(({ state }) => state.models);
  const devices = useSelector(({ state }) => state.rozborka);
  const years = useSelector(({ state }) => state.years);

  const isLoggedIn = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getModels());
    dispatch(getMotos());
    dispatch(getYears());

    return () => dispatch(clearData());
  }, []);

  useEffect(() => {
    if (types && motos && models && years) {
      const filteredProducts = filterDevices();
      setFilteredProducts(filteredProducts);
    }
  }, [
    activeType,
    activeMoto,
    activeModel,
    activeYear,
    types,
    motos,
    models,
    devices,
    years,
  ]);

  const handleAddDevice = () => {
    setValueTab("");
    setIsNew(true);
    setModalOpen(true);
  };

  const handleEditDevice = (id) => (e) => {
    setModalContent(devices?.find((device) => device.id === id));
    setIsNew(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMenuSelect = (key) => {
    const { type, moto, model, year } = parseMenuKey(key);
    setActiveType(type);
    setActiveMoto(moto);
    setActiveModel(model);
    setActiveYear(year);
  };

  const parseMenuKey = (key) => {
    const parts = key.split("-");
    const type = parseInt(parts[1]);
    const moto = parts.includes("moto") ? parseInt(parts[3]) : null;
    const model = parts.includes("model") ? parseInt(parts[5]) : null;
    const year = parts.includes("year") ? parseInt(parts[7]) : null;
    return { type, moto, model, year };
  };

  const filterDevices = () => {
    if (!devices) return [];
    if (!activeType && !activeMoto && !activeModel && !activeYear)
      return devices;

    return devices.filter(
      (device) =>
        (!activeType || device.typeId === activeType) &&
        (!activeMoto || device.motoId === activeMoto) &&
        (!activeModel || device.modelId.includes(String(activeModel))) &&
        (!activeYear || device.yearId.includes(String(activeYear)))
    );
  };

  const getProductsToRender = () => {
    return isLoggedIn ? devices : filteredProducts;
  };

  const sortedProducts = [...(getProductsToRender() || [])].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <>
      <div className="detali-top">
        <img src={moto} alt="" />
      </div>
      <div className="detali-title">Деталі з розборки</div>

      <div className="detali-content-wrap">
        <div className="detali-list-motos">
          <SelectDetails
            motos={motos}
            types={types}
            models={models}
            devices={devices}
            years={years}
            onMenuSelect={handleMenuSelect} // Передаем функцию обработки выбора элемента меню
          />
        </div>
        <div className="detali-content-items">
          <ul className="device-content">
            {isLoggedIn && (
              <Space wrap size={16} className="plus-button">
                <Avatar
                  size={84}
                  icon={<PlusOutlined />}
                  onClick={handleAddDevice}
                />
              </Space>
            )}

            <AsyncModalDevice
              type={detailType}
              isNew={isNew}
              setImageTab={setImageTab}
              isImageTab={isImageTab}
              isOpen={isModalOpen}
              setModalOpen={setModalOpen}
              modalContent={modalContent}
              editValueTab={editValueTab}
              setValueTab={setValueTab}
              setIsNew={setIsNew}
              setModalContent={setModalContent}
              motos={motos}
              types={types}
              models={models}
            />

            {filteredProducts?.map((device) => (
              <li key={device.id} className="device-item">
                <CardRozborka
                  images={device.images}
                  type={types?.find((type) => type.id === device.typeId)?.name}
                  price={device.price}
                  title={device.title}
                  description={device.description}
                  name={device.name}
                  id={device.id}
                  motoId={device.motoId}
                  disabled={device.disabled}
                  handleEditDevice={handleEditDevice}
                  isLoggedIn={isLoggedIn}
                  // sortProducts={sortProducts}
                  models={models}
                  modelId={device.modelId}
                  yearId={device.yearId}
                  yearsArray={years}
                  autoTitle={{
                    findMoto: motos?.find((moto) => device.motoId === moto.id),
                    findType: types?.find((type) => device.typeId === type.id),
                    // findYear: years?.find((years) => device.typeId === years.id),
                    findModels: models?.filter(
                      (moto) => device.modelId === moto.id
                    ),
                    motos: motos,
                    modelId: device.modelId,
                    device: device,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
