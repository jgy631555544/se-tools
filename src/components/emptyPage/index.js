import { Empty } from "antd";
import React from "react";

function EmptyPage(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={props.description || "暂无数据"}
      />
    </div>
  );
}
export default React.memo(EmptyPage);
