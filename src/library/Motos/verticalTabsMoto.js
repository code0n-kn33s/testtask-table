import React, { useState, useEffect } from "react";
import { Tabs, Input, Tooltip, Button } from "antd";
import { VerticalTabsModels, UploadElement } from "./../index";
import { AsyncModalMoto } from "./asyncModalMoto";
import { useDispatch, useSelector } from "react-redux";

import {
  addTypes,
  addDevices,
  addModels,
  addMotos,
  editMotos,
  getMotos,
  deleteMotos,
} from "../../toolkitReducers";

const VerticalTabs = (props) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editValueTab, setValueTab] = useState("");
  const [isImageTab, setImageTab] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Функция-обработчик для обновления ширины окна
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Добавляем обработчик события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Устанавливаем начальное значение ширины окна
    setWindowWidth(window.innerWidth);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();

  const models = useSelector(({ state }) => state.models);

  const firstItem = {
    label: (
      <li key={0} className="moto-item">
        <div className="moto-mark">всi</div>
      </li>
    ),
    key: 0,
    default: true,
  };

  const tabClicked = (id, e) => {
    if (id === 0) return;
    setValueTab(props.motos?.find((moto) => moto.id === id).mark);
    setModalContent(props.motos?.find((moto) => moto.id === id));
    setModalOpen(true);
    setImageTab(props.motos?.find((moto) => moto.id === id).image);
    setIsNew(false);
  };

  const onTabChanged = (x, y) => {
    if (x == 0) return;
    if (y === "remove") {
      dispatch(deleteMotos(x));
      setTimeout(() => {
        dispatch(getMotos(x));
      }, 500);
    }

    if (y === "add") {
      setValueTab("");
      setModalOpen(true);
      setModalContent({ mark: "", image: null });
      setIsNew(true);
    }
  };

  const clickTabInner = (id) => {
    props.setActiveMoto(props.motos?.find((moto) => moto.id === id));
  };

  const tabs = props.motos
    ?.map((moto, i) => {
      return {
        label: (
          <li
            key={moto.id}
            onClick={() => clickTabInner(moto.id)}
            className="moto-item"
          >
            <div className="moto-image">
              {moto.image && (
                <img src={process.env.REACT_APP_API_URL + moto.image} alt="" />
              )}
            </div>
            <div className="moto-mark">{moto.mark}</div>
          </li>
        ),

        key: moto.id,
        disabled: moto.disabled,
        children: (
          <VerticalTabsModels
            models={props.models?.filter((model) => model.motoId === moto.id)}
            setActiveModel={props.setActiveModel}
            motoId={moto.id}
            isLoggedIn={props.isLoggedIn}
            sortProducts={props.sortProducts}
          />
        ),
      };
    })
    .concat(firstItem)
    .reverse();

  return (
    <div>
      <AsyncModalMoto
        type={"moto"}
        isNew={isNew}
        setImageTab={setImageTab}
        isImageTab={isImageTab}
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
        editValueTab={editValueTab}
        setValueTab={setValueTab}
        setIsNew={setIsNew}
      />
      <Tabs
        tabPosition={windowWidth > 750 ? "left" : "top"}
        type={props.isLoggedIn ? "editable-card" : false}
        onTabClick={
          props.isLoggedIn ? tabClicked : (id) => props.sortProducts("moto", id)
        }
        onEdit={onTabChanged}
        items={tabs}
      />
    </div>
  );
};
export default VerticalTabs;
