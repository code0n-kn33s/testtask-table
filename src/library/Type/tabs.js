import React, { useState, useEffect } from 'react';
import { Tabs, Input, Tooltip, Button } from 'antd';

import { ModalTypes } from './modalTypes';
import { useDispatch, useSelector } from 'react-redux';

import {
  addTypes,
  addDevices,
  addModels,
  addMotos,
  editMotos,
  getTypes,
  deleteTypes
} from '../../toolkitReducers'

export const TabsElement = (props) => {

  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editValueTab, setValueTab] = useState('');
  const [isNew, setIsNew] = useState(false);

  const dispatch = useDispatch();

  // const models = useSelector(({ state }) => state.models)

  const firstItem = {
    label: (
      <li key={0} className="moto-item">
        <div className="moto-mark">
          всi
        </div>
      </li>
    ),
    key: 0,
  }


  const tabClicked = (id, e) => {

    if (id === 0) return
    setValueTab(props.types?.find(moto => moto.id === id).name)
    setModalContent(props.types?.find(moto => moto.id === id))
    setModalOpen(true)
    setIsNew(false)
  }

  const onTabChanged = (x, y) => {
    if (x == 0) return
    if (y === 'remove') {
      dispatch(deleteTypes(x))
      setTimeout(() => {
        dispatch(getTypes())

      }, 500);
    }

    if (y === 'add') {
      setValueTab('')
      setModalOpen(true)
      setModalContent({ name: '' })
      setIsNew(true)
    }
  }


  const clickTabInner = (id) => {
    props.setActiveModel(props.types?.find(type => type.id === id))
  }


  const items = props.types?.map(type => {
    return {
      key: type.id,
      label: type.name,

      // children: 'Content of Tab Pane 1',
    }
  }).concat(firstItem).reverse()

  return (
    <>
      <ModalTypes
        type={"types"}
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
        defaultActiveKey={false}
        items={items}
        type={props.isLoggedIn ? "editable-card" : false}
        onTabClick={props.isLoggedIn ? tabClicked : (id) => props.sortProducts('types', id)}
        onEdit={onTabChanged}
      />
    </>
  )
}
