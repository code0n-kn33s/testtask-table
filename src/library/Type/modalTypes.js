import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';

import { FormOutlined } from '@ant-design/icons';
import { addTypes, editTypes, getTypes } from '../../toolkitReducers'
import { useDispatch, useSelector } from 'react-redux';

// loading
// fullfilled
// rejected

export const ModalTypes = (props) => {
    const { isOpen, setModalOpen, modalContent, isNew, editValueTab, setValueTab, setIsNew } = props

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Оберiть назву деталi мотоциклу');

    const dispatch = useDispatch()

    useEffect(() => {
        setValueTab(modalContent?.name)
    }, [])

    const handleOk = () => {
        if (editValueTab === '') {
            setModalText('Поле input не має бути пустим');
            return
        }

        setModalText('Створення...');

        if (editValueTab) {
            if (isNew) {
                dispatch(addTypes(editValueTab))
            } else {
                dispatch(editTypes({
                    id: modalContent.id,
                    name: editValueTab,
                }))
            }

            setConfirmLoading(true);
        } else {
            setModalText('Введiть назву деталi мотоциклу');
        }


        setTimeout(() => {
            setConfirmLoading(false)
            setModalOpen(false)
            dispatch(getTypes())
            setModalText('Оберiть для назву деталi мотоциклу');
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
                title={isNew ? "Створити назву деталi" : "Змiнити назву деталi: " + modalContent?.name}
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
                            placeholder="Введiть назву деталi мотоциклу"
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