/**

 * @author GuanYu Jin
 * @date 2022/1/7 16:05
 * @description 无法预览的文件展示

 */

import React from "react";
import { getCalcClassName } from "../../utils";
import "./index.less";

function UnablePreview(props) {
  const { url } = props;
  const className = getCalcClassName("se-unable-preview", props);
  return (
    <div {...props} className={className}>
      <span className="se-unable-preview-text">此文件格式不支持预览</span>
      <div className="se-unable-preview-operation">
        <a className="se-unable-preview-operation-btn" title="下载" href={url}>
          <em className="icon-download" />
        </a>
      </div>
    </div>
  );
}
export default UnablePreview;
