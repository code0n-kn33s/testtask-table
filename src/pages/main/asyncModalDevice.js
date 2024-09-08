import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, InputNumber, Form } from 'antd';
import { UploadElement } from './uploadImages';
import { Label } from './label';

import { FormOutlined, DollarOutlined } from '@ant-design/icons';
import { addDevices, editDevices, getDevices } from '../../toolkitReducers'
import { useDispatch, useSelector } from 'react-redux';

import CheckModels from "./checkModels";
import CheckTypes from "./checkTypes";
import CheckMarks from "./checkMarks";

// loading
// fullfilled
// rejected

export const AsyncModalDevice = (props) => {
    const { isOpen, setModalOpen, modalContent, setModalContent, isNew, editValueTab, setValueTab, setIsNew } = props

    const [isName, setName] = useState('')
    const [isprice, setprice] = useState('')
    const [istitle, settitle] = useState('')
    const [isimages, setimages] = useState([])
    const [isdescription, setdescription] = useState('')
    const [selectedType, setSelectedType] = useState(null)
    const [selectedMark, setSelectedMark] = useState(null)
    const [selectedModels, setSelectedModels] = useState(null)
    const [isErrors, setIsErrors] = useState([])

    const [checkedList, setCheckedList] = useState([]);
    const [options, setOptions] = useState([]);
    // will change
    const [imageUrl, setImageUrl] = useState();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Заповнiть поля для деталi');

    const dispatch = useDispatch()

    useEffect(() => {
        if (isNew) {
            setName('')
            setprice('')
            settitle('')
            setdescription('')
            setimages([])
            setSelectedType(null)
        } else {
            modalContent?.name && setName(modalContent.name);
            modalContent?.title && settitle(modalContent?.title)
            setprice(modalContent?.price)
            setdescription(modalContent?.description)
            setSelectedType(modalContent?.typeId)
            setimages(modalContent?.images)
            setSelectedMark(modalContent?.motoId)
        }
    }, [modalContent?.name, modalContent, isNew])

    const handleChangeType = (value) => {
        setSelectedType(value)
    };

    const handleOk = () => {
        if (isErrors.length > 0) {
            setModalText('Поле input немає бути пустим');
            return
        }

        setModalText('Створення...');

        if (!isprice) {
            setModalText('Введiть ціну');
            return false
        }
        if (!selectedType) {
            setModalText('Оберiть тип деталi');
            return false
        }
        if (!selectedMark) {
            setModalText('Оберiть марку мотоциклу');
            return false
        }

        

        const sendFiedls = {
            "name": isName,
            "price": isprice,
            "title": istitle,
            "description": '',
            "typeId": selectedType,
            "motoId": selectedMark,
            "modelId": checkedList,
            "disabled": '',
            "images": isimages,
        }

        if(isNew) {
            dispatch(addDevices(sendFiedls))
        } else {
            dispatch(editDevices({...sendFiedls, id: modalContent.id}))
        }

        setTimeout(() => {
            setConfirmLoading(false)
            props.setImageTab(false)
            setModalOpen(false)
            dispatch(getDevices())
            setModalText('Заповнiть поля');
            setIsNew(false)
        }, 1500);

    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleOk();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyPress);
        } else {
            window.removeEventListener('keydown', handleKeyPress);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isOpen, handleOk]);

    const handleCancel = () => {
        setModalOpen(false);
        props.setImageTab(false)
    };

    const onChangePrice = (e) => {
        setprice(e)
    }

    const onChangeMark = (e) => {
        setSelectedMark(e.target.value)
    };

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <>
            <Modal
                title={isNew ? "Створити деталь" : "Змiнити деталь " }
                open={isOpen}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                width={"70%"}
                onCancel={handleCancel}
            >
                <div className='modal-content'>
                    <div className='modal-content-name'>
                        <div style={{ color: "orange" }}>{modalText}</div>

                        <div className="images-block">
                            {/* images uploads */}
                            <UploadElement
                                isImageTab={props.isImageTab}
                                modalContent={modalContent}
                                setImageTab={props.setImageTab}
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                isimages={isimages}
                                setimages={setimages}
                            />
                        </div>

                        <div className="content-block">
                            <div className="content-block-left">

                                {/* text inputs */}
                                <label className="input-label-item" label="Заголовок деталi" name="username" >
                                    <span>Заголовок деталi</span><br />
                                    <Input
                                        onChange={onChangeName}
                                        placeholder="Введiть заголовок"
                                        variant="filled"
                                        value={isName}
                                        size="large"

                                        prefix={<FormOutlined />}
                                    />
                                </label>

                                <label className="input-label-item" label="Цiна деталi" name="username" rules={[{ required: true }]}>
                                    <span>Цiна деталi <b style={{ color: 'orange' }}>*</b></span><br />
                                    <InputNumber
                                        placeholder="Введiть цiну"
                                        size="large"
                                        value={isprice}
                                        variant="filled"
                                        type="number"
                                        step="10"
                                        min={0}
                                        defaultValue={3}
                                        onChange={onChangePrice}
                                        prefix={<DollarOutlined />}
                                    />
                                </label>

                                <label className="input-label-item" label="Додаткова iнформацiя" name="username" rules={[{ required: false }]}>
                                    <span>Додаткова iнформацiя</span><br />

                                    <Input.TextArea
                                        onChange={(e) => settitle(e.target.value)}
                                        placeholder="Введiть заголовок"
                                        size="large"
                                        value={istitle}
                                        variant="filled"
                                        name="title"
                                        prefix={<FormOutlined />}
                                        autoSize={{ minRows: 1, maxRows: 6 }}
                                    />
                                </label>

                                {/* <label className="input-label-item" label="Опис" name="username" rules={[{ required: false }]}>
                                    <span>Опис </span><br/>

                                    <Input.TextArea
                                        onChange={(e) => setdescription(e.target.value)}
                                        placeholder="Введiть опис"
                                        size="large"
                                        value={isdescription}
                                        variant="filled"
                                        name="description"
                                        prefix={<FormOutlined />}
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                    />
                                </label> */}

                            </div>



                            <div className='modal-content-image'>
                                {/* checkbox inputs */}
                                <label className="input-label-item" label="Виберiть тип деталi" name="username" rules={[{ required: true }]}>
                                    <span>Виберiть тип деталi <b style={{ color: 'red' }}>*</b></span><br />

                                    <CheckTypes
                                        types={props.types}
                                        selectedType={selectedType}
                                        handleChangeType={handleChangeType}
                                    />
                                </label>

                                <label className="input-label-item" label="Виберiть марку мотоциклу" name="username" rules={[{ required: true }]}>
                                    <span>Виберiть марку мотоциклу <b style={{ color: 'red' }}>*</b></span><br />

                                    <CheckMarks
                                        marks={props.motos}
                                        markId={modalContent?.motoId}
                                        onChangeMark={onChangeMark}
                                        selectedMark={selectedMark}
                                        setSelectedMark={setSelectedMark}
                                    />
                                </label>

                                <label className="input-label-item" label="Виберiть моделi" name="username" rules={[{ required: false }]}>
                                    <span>Виберiть моделi </span><br />

                                    <CheckModels
                                        models={props.models}
                                        motoId={selectedMark}
                                        modelsChecked={modalContent?.modelId}
                                        checkedList={checkedList}
                                        setCheckedList={setCheckedList}
                                        options={options}
                                        setOptions={setOptions}
                                    />
                                </label>


                            </div>
                        </div>
                    </div>

                </div>

            </Modal>
        </>
    );
};