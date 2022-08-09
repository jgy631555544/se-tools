import React from "react";
import classnames from "classnames";
import "./index.less";

function SectionDashBoard(props = {}) {
  const {
    angle = 180,
    name = "名称",
    width = 160,
    min = 0,
    max = 100,
    value = 0,
    unit = "℃",
    color = "#3DCD58",
    innnerCircleWidth = 10,
    outerCircleWidth = 2,
    className,
    icon,
    iconStyle = {},
    nameStyle = {},
  } = props;
  const height = width * 0.75;
  // 圆心坐标
  const centerX = width * 0.5;
  const centerY = width * 0.5;
  const redius = width * 0.5;
  const sections = [
    {
      min,
      max: value,
      color,
    },
    {
      min: value,
      max,
      color: "#e6e6e6",
    },
  ];
  // 指示器的半径计算
  const innerRadius = redius - innnerCircleWidth;
  const getAngle = (data) => (data / (max - min)) * angle - angle * 0.5;
  const polarToCartesian = (radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  const getSetting = (radius, startAngle, endAngle) => {
    const start = polarToCartesian(radius, startAngle);
    const end = polarToCartesian(radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  };
  return (
    <div
      className={classnames("se-tools-dashboard-value", {
        [className]: className,
      })}
    >
      <svg width={width} height={height}>
        <path
          d={getSetting(redius, -angle * 0.5, angle * 0.5)}
          fill="none"
          stroke="#eee"
          strokeWidth={outerCircleWidth}
        />
        {sections.map((section, index) => (
          <path
            key={index}
            d={getSetting(
              innerRadius,
              getAngle(section.min),
              getAngle(section.max),
            )}
            fill="none"
            stroke={section.color}
            strokeWidth={innnerCircleWidth}
          />
        ))}
      </svg>
      <div className="se-tools-dashboard-value-info">
        <div
          className="se-tools-dashboard-value-info-name"
          style={{ top: height * 0.3, ...nameStyle }}
        >
          {name}
        </div>
        {icon && (
          <div
            className="se-tools-dashboard-value-info-icon"
            style={{ bottom: height * 0.2, ...iconStyle }}
          >
            {icon}
          </div>
        )}
        <div className="se-tools-dashboard-value-info-extremum">
          <div className="se-tools-dashboard-value-info-extremum-value">
            {min}
          </div>
          <div className="se-tools-dashboard-value-info-extremum-value">
            {max}
          </div>
        </div>
        <div className="se-tools-dashboard-value-info-value">
          <span className="se-tools-dashboard-value-info-value-number">
            {value === null ? "-" : value}
          </span>
          <span className="se-tools-dashboard-value-info-value-unit">
            {value !== null && unit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SectionDashBoard;
