/**

 * @author GuanYu Jin
 * @date 2021/12/31 15:05
 * @description 预览pdf

 */
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Pagination, message, Spin } from "antd";
import { cookie, getCalcClassName } from "../../utils";
import "./index.less";

const publicPath = window.__options?.publicPath;
pdfjs.GlobalWorkerOptions.workerSrc = publicPath
  ? `${publicPath}/library/pdfworker.js`
  : `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PdfPreview(props) {
  const { url, pdfworkerPath } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState(0);
  const [width, setWidth] = useState(document.body.clientWidth - 296);
  const httpHeaders = { CUSTOMERID: cookie.get("CUSTOMERID") };
  const [file, setFile] = useState({ url, httpHeaders, withCredentials: true });

  if (pdfworkerPath) pdfjs.GlobalWorkerOptions.workerSrc = pdfworkerPath;

  const handleResize = () => setWidth(document.body.clientWidth - 296);

  const loadSuccess = ({ numPages }) => setTotalNumber(numPages);

  const loadError = () => message.error("加载失败，请刷新页面后重试");

  const pageOnChange = (number) => setPageNumber(number);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPageNumber(1);
    setTotalNumber(0);
    setFile({ url, httpHeaders, withCredentials: true });
  }, [url]);
  const className = getCalcClassName("se-pdf-preview", props);
  return (
    <div {...props} className={className}>
      <Document
        file={file}
        className="se-pdf-preview-document"
        onLoadSuccess={loadSuccess}
        onLoadError={loadError}
        loading={<Spin size="large" tip="正在努力加载中" />}
      >
        <Page pageNumber={pageNumber} width={width} scale={1} />
      </Document>
      <div className="se-pdf-preview-footer">
        {totalNumber !== 0 && (
          <Pagination
            onChange={pageOnChange}
            total={totalNumber * 10}
            current={pageNumber}
          />
        )}
      </div>
      <a className="operation-btn" title="下载" href={url}>
        <em className="icon-download" color="white" />
      </a>
    </div>
  );
}

export default React.memo(PdfPreview);
