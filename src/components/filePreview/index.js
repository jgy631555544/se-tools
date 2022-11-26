import React, { useEffect, useRef, useState } from "react";
import { Icon, Input } from "antd";
import * as dayjs from "dayjs";
import PDFPreview from "../pdfPreview";
import ImagePreview from "../imagePreview";
import UnablePreview from "../unablePreview";
import "./index.less";

const regex = {
  IMAGE: /(png|PNG|jpe?g|JPE?G|bmp|BMP|gif|GIF)/,
};
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_ESC = 27;

function FilePreview(props) {
  const Files = props.data.Pictures;
  const [index, setIndex] = useState(props.index);
  const [data, setData] = useState(props.data);
  const FilesLength = Files?.length;
  const File = Files[index];
  const image = useRef(null);
  const hasLeft = () => index > 0;

  const hasRight = () => index < FilesLength - 1;

  const goLeft = () => {
    if (image.current) {
      image.current.handleDefaultClick();
    }
    setIndex(index - 1);
  };

  const goRight = () => {
    if (image.current) {
      image.current.handleDefaultClick();
    }
    setIndex(index + 1);
  };

  const handleKeyInput = (event) => {
    const key = event.which;
    if (event.target.type !== "textarea") {
      if (key === KEY_ESC) {
        props.onCancel(event);
      } else if ((key === KEY_LEFT || key === KEY_UP) && hasLeft()) {
        goLeft();
      } else if ((key === KEY_RIGHT || key === KEY_DOWN) && hasRight()) {
        goRight();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyInput);
    return () => {
      window.removeEventListener("keyup", handleKeyInput);
    };
  }, []);

  const formatDate = (dateStr) => {
    const date = dayjs(dateStr);
    return (formatStr) => date.isValid() && date.format(formatStr);
  };

  function Header() {
    const originalName = File.leftTopTitle;
    return (
      !props.onlyImage && (
        <div className="se-file-preview-header">
          <span title={originalName}>
            {originalName.length > 20
              ? `${originalName.substr(0, 8)}...${originalName.substr(
                  originalName.length - 6,
                )}`
              : originalName}
          </span>
          {FilesLength > 0 && originalName && (
            <span className="se-file-preview-header-separator">|</span>
          )}
          {!props.isShowCreateUser &&
            (File.CreateUserName || props.data.CreateUserName) && (
              <>
                <Icon
                  type="user"
                  className="se-file-preview-header-uploader-icon"
                />
                <span className="se-file-preview-header-uploader">
                  {File.CreateUserName || props.data.CreateUserName}
                </span>
              </>
            )}
          {(File.CreateTime || File.UploadTime) && (
            <>
              <span className="se-file-preview-header-date">
                上传于
                {formatDate(File.CreateTime || File.UploadTime)(
                  "YYYY年MM月DD日",
                )}
              </span>
              <span className="se-file-preview-header-time">
                {formatDate(File.CreateTime || File.UploadTime)("HH:mm")}
              </span>
            </>
          )}
        </div>
      )
    );
  }

  function Caption() {
    if (props.onlyImage) return null;
    const caption = FilesLength > 0 ? File.Content : data.Content;
    if (!props.editable && !caption) {
      return <div style={{ height: "40px" }} />;
    }
    const autoSize = { minRows: 1 };
    let wrapperClassName = "se-file-preview-caption-noImg";
    if (FilesLength > 0) {
      autoSize.maxRows = 2;
      wrapperClassName = "se-file-preview-caption";
    }
    return (
      <div className={wrapperClassName}>
        <Input.TextArea
          disabled={!props.editable}
          autoSize={autoSize}
          placeholder={props.editable ? props.hintText : ""}
          value={caption}
          onChange={(e) => {
            const newData = data.setIn(
              ["Pictures", index, "Content"],
              e.target.value,
            );
            setData(newData);
          }}
          onBlur={(e) => {
            e.stopPropagation();
            const defaultContent =
              FilesLength > 0 ? File.Content : props.data.get("Content");
            if (e.target.value !== defaultContent) {
              props.onCaptionChange(data, index);
            }
          }}
        />
      </div>
    );
  }

  const renderViewer = () => {
    const {
      url,
      PictureId,
      FileName,
      PictureUrl,
      DownloadName,
      PictureContent,
      ImageContent,
    } = File;

    const pdfUrl =
      url ||
      `${
        window.__options.APIBasePath
      }/common/file/download/${PictureId}?fileName=${encodeURIComponent(
        FileName,
      )}`;
    let downloadUrl =
      url ||
      `${
        window.__options.APIBasePath
      }/common/file/download/${PictureId}?fileName=${encodeURIComponent(
        DownloadName,
      )}&openWith=download`;
    if (PictureUrl) downloadUrl = "";
    const _type = FileName?.replace(/.+\./, "").toLowerCase() || "png";
    if (_type === "pdf" || props.filetype === "pdf") {
      return <PDFPreview url={pdfUrl} />;
    }
    if (regex.IMAGE.test(_type)) {
      return (
        <ImagePreview
          ref={image}
          isShowBgcLink={url}
          url={PictureUrl}
          imageId={PictureId}
          imageContent={PictureContent}
          pictureContent={ImageContent}
          link={downloadUrl}
        />
      );
    }
    return <UnablePreview url={downloadUrl} />;
  };
  return (
    <div className="se-file-preview">
      <div className="se-file-preview-background">
        <div className="preview-close">
          <em className="icon-close" onClick={props.onCancel} />
        </div>
        <Header />
        <Caption />
        <div className="se-file-preview-content">
          <div className="se-file-preview-content-arrow">
            {hasLeft() && (
              <em className="icon-arrow-left arrow" onClick={goLeft} />
            )}
          </div>
          <div className="se-file-preview-content-preview">
            {FilesLength !== 0 && (
              <div className="se-file-preview-content-preview-bg">
                {renderViewer()}
              </div>
            )}
            {FilesLength > 0 && (
              <div className="se-file-preview-content-preview-num">
                {index + 1}/{FilesLength}
              </div>
            )}
          </div>
          <div className="se-file-preview-content-arrow">
            {hasRight() && (
              <em className="icon-arrow-right arrow" onClick={goRight} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

FilePreview.defaultProps = {
  index: 0,
  isShowCreateUser: false,
  hintText: "点击添加日志内容",
  editable: false,
  onlyImage: false,
  data: {},
  onCancel: () => {
    console.info("ImagesView's function 'onCancel' is undefined.");
  },
  onCaptionChange: () => {},
};

export default FilePreview;
