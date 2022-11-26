import { Spin } from "antd";
import React from "react";
import "./index.less";

function PageLoading() {
  return (
    <div className="se-tools-page-loading">
      <Spin size="large" />
    </div>
  );
}
export default PageLoading;
