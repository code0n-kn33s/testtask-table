import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { UploadElement } from './upload';
import { FormOutlined } from '@ant-design/icons';
import { addModels, editModels, getModels } from '../../toolkitReducers'
import { useDispatch, useSelector } from 'react-redux';

// loading
// fullfilled
// rejected

export const AsyncModalModels = (props) => {
    const { isOpen, setModalOpen, modalContent, isNew, editValueTab, setValueTab, setIsNew } = props

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Оберiть назву для моделi мотоциклу');

    const dispatch = useDispatch()

    useEffect(() => {
        setValueTab(modalContent?.model)
    }, [])

    const handleOk = () => {
        if (editValueTab === '') {
            setModalText('Поле input не має бути пустим');
            return
        }

        setModalText('Створення...');

        if (editValueTab) {
            if (isNew) {
                dispatch(addModels({
                    model: editValueTab,
                    motoId: props.motoId
                }))
            } else {
                dispatch(editModels({
                    id: modalContent.id,
                    model: editValueTab,
                    motoId: props.motoId
                }))
            }

            setConfirmLoading(true);
        } else {
            setModalText('Введiть модель мотоциклу');
        }


        setTimeout(() => {
            setConfirmLoading(false)
            setModalOpen(false)
            dispatch(getModels())
            setModalText('Оберiть назву для моделi мотоциклу');
            setIsNew(false)
        }, 1000);

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
    };

    return (
        <>
            <Modal
                title={isNew ? "Створити модель" : "Змiнити модель: " + modalContent?.model}
                open={isOpen}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                width={"50%"}
                onCancel={handleCancel}
            >
                <div className='modal-content'>
                    <div className='modal-content-name'>
                        <div style={{ color: "#bf6623" }}>{modalText}</div>
                        <br />
                        <Input
                            onChange={(e) => setValueTab(e.target.value)}
                            placeholder="Введiть модель мотоциклу"
                            size="large"
                            value={editValueTab}
                            prefix={<FormOutlined />}
                        />
                    </div>
                </div>

            </Modal>
        </>
    );
};