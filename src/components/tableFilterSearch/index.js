import { Button, Icon, Input } from "antd";
import React from "react";
/*
  按需传入参数，然后解构到相应column中,配合Table的onChange进行搜索
  例：
  {
      title: "设备ID",
      dataIndex: "DeviceId",
      width: "11%",
      key: "DeviceId",
      ...TableFilterSearch(
        filterValue
      ),
    }
*/

export default function TableFilterSearch(filterValue) {
  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => {
    const change = (e) => {
      setSelectedKeys(e.target.value ? [e.target.value] : []);
    };
    const search = () => {
      confirm();
    };
    const resetSearch = () => {
      clearFilters();
    };
    return (
      <div style={{ padding: 8 }}>
        <Input
          value={selectedKeys[0]}
          onChange={change}
          onPressEnter={search}
          style={{ marginBottom: 8, display: "block" }}
          allowClear
          placeholder="请输入"
        />
        <Button
          type="primary"
          icon="search"
          size="small"
          onClick={search}
          style={{ width: 90, marginRight: 8, marginLeft: 0 }}
        >
          搜索
        </Button>
        <Button size="small" style={{ width: 90 }} onClick={resetSearch}>
          重置
        </Button>
      </div>
    );
  };
  const filterIcon = (status) => (
    <Icon type="search" style={{ color: status ? "#3DCD58" : undefined }} />
  );
  const filteredValue = filterValue !== "" ? [filterValue] : [];
  return {
    filterIcon,
    filterDropdown,
    filteredValue,
  };
}
