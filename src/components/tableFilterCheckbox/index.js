import { Button, Checkbox } from "antd";
import React from "react";
/*
  按需传入参数，然后解构到相应column中,配合Table的onChange进行搜索
  例：
  {
      title: "设备ID",
      dataIndex: "DeviceId",
      width: "11%",
      key: "DeviceId",
      ...TableFilterCheckbox(
        [
          { label: "报告已生成", value: 1 },
          { label: "报告生成中", value: 2 }
        ],
        filterOptions
      ),
    }
*/
export default function TableFilterCheckbox(checkboxOptions, filterOptions) {
  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => {
    const change = (value) => {
      setSelectedKeys(value);
    };
    const seach = () => {
      confirm();
    };
    const resetSearch = () => {
      clearFilters();
    };
    return (
      <div className="se-table-filter-checkbox">
        <Checkbox.Group
          options={checkboxOptions}
          onChange={change}
          value={selectedKeys}
        />
        <div className="se-table-filter-checkbox-footer">
          <Button
            type="primary"
            onClick={seach}
            size="small"
            className="se-table-filter-checkbox-footer-confirm"
          >
            确定
          </Button>
          <Button
            onClick={resetSearch}
            size="small"
            className="se-table-filter-checkbox-footer-reset"
          >
            重置
          </Button>
        </div>
      </div>
    );
  };
  const filteredValue = filterOptions !== "" ? filterOptions : [];
  return {
    filteredValue,
    filterDropdown,
  };
}
