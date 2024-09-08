import React, { useEffect } from 'react';
import { Card } from 'antd';

import { CarouselApp } from './carousel';
import { EditOutlined, StopOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import {
  getDevices,
  deleteDevices,
} from '../../toolkitReducers'

const { Meta } = Card;

export const CardElement = (props) => {
  const dispatch = useDispatch();

  const models = useSelector(({ state }) => state.models)

  useEffect(() => {
    // let filtred = props.models?.filter(m => (m.motoId === motoId))

    // console.log('models:>> ', models);
  }, [props.models])

  const handleDelete = (value)=> (event) => {
    dispatch(deleteDevices(value))

    setTimeout(() => {
      dispatch(getDevices())
    }, 500);
  }

  const getModelsArr = () => {
    if (Array.isArray(props.modelId)) { // перевіряємо, чи props.modelId є масивом
      let values = props.models?.filter(moto => props.modelId.includes(String(moto.id)))
      let labels = values?.map(model => model.model).join(', ')
      return <>Моделі: {labels ? labels : ''}</>
    } else {
      return null; // або інша логіка, яка повідомить користувача про помилку
    }
  }
  

  return (
    <Card
      hoverable
      actions={props.isLoggedIn ? [
        <EditOutlined onClick={props.handleEditDevice(props.id)} key="edit" />,
        <StopOutlined onClick={handleDelete(props.id)} key="setting" />,
      ] : false}

      // onTabClick={props.isLoggedIn ? tabClicked : props.sortProducts}
      className={"card-style"}
      cover={
        <CarouselApp
          images={props.images}
        />
      }
    >

      <Meta title={<>{props.autoTitle?.findType?.name} для <br/> {props.autoTitle?.findMoto?.mark}</>} description={getModelsArr()} />
      <Meta title={props.name} description={props.title} />

      <h3>{props.price} USD</h3>

    </Card>
  )
}