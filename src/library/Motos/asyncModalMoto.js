import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'antd';
import { UploadElement } from './upload';
import { FormOutlined } from '@ant-design/icons';
import { addMotos, editMotos, getMotos } from '../../toolkitReducers'
import { useDispatch, useSelector } from 'react-redux';

// loading
// fullfilled
// rejected

export const AsyncModalMoto = (props) => {
    const { isOpen, setModalOpen, modalContent, isNew, editValueTab, setValueTab, setIsNew } = props
    const fetching = useSelector(state => {
        return state.add.fething;
    })
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Оберiть назву i картинку для марки мотоциклу');
    const [imageUrl, setImageUrl] = useState();

    const dispatch = useDispatch()

    useEffect(() => {
        setValueTab(modalContent?.mark)
    }, [])

    const handleValueChange = (e) => {
        setValueTab(e.target.value);
    };

    const handleOk = () => {
        if (editValueTab === '') {
            setModalText('Поле input немає бути пустим');
            return
        }

        setModalText('Створення...');

        if (editValueTab) {
            if (isNew) {
                if (imageUrl) {
                    dispatch(addMotos({
                        mark: editValueTab,
                        image: imageUrl?.selectedFile
                    }))
                } else {
                    dispatch(addMotos({
                        mark: editValueTab,
                    }))
                }
            } else {
                dispatch(editMotos({
                    id: modalContent.id,
                    mark: editValueTab,
                    image: imageUrl?.selectedFile
                }))
            }

            setConfirmLoading(true);
        } else {
            setModalText('Введiть марку мотоциклу');
        }


        setTimeout(() => {
            setConfirmLoading(false)
            props.setImageTab(false)
            setModalOpen(false)
            dispatch(getMotos())
            setModalText('Оберiть назву i картинку для марки мотоциклу');
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
        props.setImageTab(false)
        props.setIsNew(false)
    };

    return (
        <>
            <Modal
                title={isNew ? "Створити марку" : "Змiнити марку: " + modalContent?.mark}
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
                            placeholder="Введiть марку мотоцикла"
                            size="large"
                            value={editValueTab}
                            prefix={<FormOutlined />}
                        />
                    </div>
                    {props.type === 'moto' &&
                        <div className='modal-content-image'>
                            {/* {modalContent?.image} */}
                            <UploadElement
                                isImageTab={props.isImageTab}
                                modalContent={modalContent}
                                setImageTab={props.setImageTab}
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                            />
                        </div>
                    }
                </div>
                {/* <Tooltip title="search">
                    <Button type="dashed" onClick={buttonCancel} shape="circle" icon={<StopOutlined />} />
                    <Button type="dashed" onClick={buttonDone} shape="circle" icon={<CheckOutlined />} />
                </Tooltip> */}

            </Modal>
        </>
    );
};