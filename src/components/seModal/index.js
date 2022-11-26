import ReactDOM from "react-dom";
import React from "react";
import { Modal } from "antd";

function show(props) {
  const div = document.createElement("div");
  return new Promise((resolve) => {
    const removeModal = () => {
      ReactDOM.unmountComponentAtNode(div);
      try {
        document.body.removeChild(div);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    };
    const onCancel = () => {
      props?.onCancel?.();
      removeModal();
      resolve(false);
    };
    const onOk = () => {
      props?.onOk?.();
      removeModal();
      resolve(true);
    };
    const properties = {
      cancelText: props.cancelText || "取消",
      okText: props.okText || "确定",
      title: props.title || "Basic Modal",
      ...props,
      onCancel,
      onOk,
    };
    document.body.appendChild(div);
    ReactDOM.render(
      <Modal visible maskClosable={false} {...properties} />,
      div,
    );
  });
}

export default { show };
