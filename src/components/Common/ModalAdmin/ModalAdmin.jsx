import React from "react";
import { Modal } from "antd";

import "./ModalAdmin.scss";

export function ModalAdmin(props) {
  const { children, title, show, width, onClose, ...other } = props;
  return (
    <Modal
      title={title}
      open={show}
      width={width}
      onCancel={onClose}
      centered
      footer={null}
      {...other}
    >
      {children}
    </Modal>
  );
}

ModalAdmin.defaultProps = {
  size: 500,
};
