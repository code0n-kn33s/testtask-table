import React from 'react';
import { Modal } from 'antd';

const GroupActionModal = ({
  isModalVisible,
  setIsModalVisible,
  handleConfirmAction,
  pendingAction,
}) => (
  <Modal
    title="Підтвердити групову дію"
    visible={isModalVisible}
    onCancel={() => setIsModalVisible(false)}
    onOk={handleConfirmAction}
  >
    <p>Вы уверены, что хотите {pendingAction === 'confirm' ? 'підтвердити' : 'зняти підтвердження'} для выбранных строк?</p>
  </Modal>
);

export default GroupActionModal;
