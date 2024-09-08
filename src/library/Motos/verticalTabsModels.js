import React, { useState, useEffect } from "react";
import { Tabs, Input, Tooltip, Button } from "antd";

import { AsyncModalModels } from "./asyncModalModels";
import { useDispatch, useSelector } from "react-redux";

import {
  addTypes,
  addDevices,
  addModels,
  addMotos,
  editMotos,
  getModels,
  deleteModels,
} from "../../toolkitReducers";

const VerticalTabsModels = (props) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editValueTab, setValueTab] = useState("");
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
    setValueTab(props.models?.find((moto) => moto.id === id).model);
    setModalContent(props.models?.find((moto) => moto.id === id));
    setModalOpen(true);
    setIsNew(false);
  };

  const onTabChanged = (x, y) => {
    if (x == 0) return;
    if (y === "remove") {
      dispatch(deleteModels(x));
      setTimeout(() => {
        dispatch(getModels());
      }, 500);
    }

    if (y === "add") {
      setValueTab("");
      setModalOpen(true);
      setModalContent({ model: "" });
      setIsNew(true);
    }
  };

  const clickTabInner = (id) => {
    props.setActiveModel(props.models?.find((model) => model.id === id));
  };

  const tabs = props.models
    ?.map((model) => {
      return {
        label: (
          <li
            key={model.id}
            onClick={() => clickTabInner(model.id)}
            className="moto-item"
          >
            <div className="moto-mark">{model.model}</div>
          </li>
        ),
        key: model.id,
      };
    })
    .concat(firstItem)
    .reverse();

  return (
    <div>
      <AsyncModalModels
        type={"model"}
        isNew={isNew}
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
        editValueTab={editValueTab}
        setValueTab={setValueTab}
        setIsNew={setIsNew}
        motoId={props.motoId}
      />

      <Tabs
        tabPosition={windowWidth > 750 ? "left" : "top"}
        type={props.isLoggedIn ? "editable-card" : false}
        onTabClick={
          props.isLoggedIn
            ? tabClicked
            : (id) => props.sortProducts("models", id)
        }
        onEdit={onTabChanged}
        items={tabs}
      />
    </div>
  );
};
export default VerticalTabsModels;
