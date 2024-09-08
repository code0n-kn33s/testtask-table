import React, { useEffect } from "react";
import { Card } from "antd";

import { CarouselApp } from "./carousel";
import { EditOutlined, StopOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import { getRozborka, deleteRozborka } from "../../toolkitReducers";

const { Meta } = Card;

export const CardRozborka = (props) => {
  const dispatch = useDispatch();

  const models = useSelector(({ state }) => state.models);

  const handleDelete = (value) => (event) => {
    dispatch(deleteRozborka(value));

    setTimeout(() => {
      console.log('setTimeout')
      dispatch(getRozborka());
    }, 500);
  };

  const getModelsArr = () => {
    if (Array.isArray(props.modelId)) {
      let values = props.models?.filter((moto) =>
        props.modelId.includes(String(moto.id))
      );

      let labels = values?.map((model) => model.model).join(", ");

      return <>Моделі: {labels ? labels : ""}</>;
    } else {
      return null;
    }
  };
  const getYearsArr = () => {
    if (Array.isArray(props.modelId)) {
      let values = props.yearsArray?.filter((item) => props.yearId.includes(String(item.id)))
        .map((item) => item.years)
        .join(", ");

      return <>  Роки: {values ? values : ""}</>;
    } else {
      return null;
    }
  };

  return (
    <Card
      hoverable
      actions={
        props.isLoggedIn
          ? [
              <EditOutlined
                onClick={props.handleEditDevice(props.id)}
                key="edit"
              />,
              <StopOutlined onClick={handleDelete(props.id)} key="setting" />,
            ]
          : false
      }
      className={"card-style"}
      cover={<CarouselApp images={props.images} />}
    >
      <Meta
        title={
          <>
            {props.autoTitle?.findType?.name} для <br />{" "}
            {props.autoTitle?.findMoto?.mark}
          </>
        }
        description={getModelsArr()}
      />
      <Meta title={props.name} description={getYearsArr()} />

      <br />
      <h3>{props.price} USD</h3>
    </Card>
  );
};
