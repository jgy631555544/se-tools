import React from "react";
import classnames from "classnames";
import "./index.less";

function SectionDashBoard(props) {
  const {
    angle = 290,
    name = "名称",
    width = 160,
    min = 0,
    max = 100,
    sections = [
      {
        min: 0,
        max: 1,
        color: "#f63131",
      },
      {
        min: 1,
        max: 31,
        color: "#fcc22b",
      },
      {
        min: 31,
        max: 101,
        color: "#01e500",
      },
    ],
    value = 0,
    innnerCircleWidth = 10,
    outerCircleWidth = 2,
    innerOuterSpace = 12,
    className,
    nameStyle = {},
    valueStyle = {},
    indicatorWidth = 2,
    indicatorSpace = 4,
  } = props;
  const height = width;
  // 圆心坐标
  const centerX = width * 0.5;
  const centerY = width * 0.5;
  const redius = width * 0.5 - 10;
  const innerRadius = redius - innerOuterSpace;
  // 当前区间
  const currentSection = sections.find(
    (section) => value >= section.min && value < section.max,
  );
  const getAngle = (data) => (data / (max - min)) * angle - angle * 0.5;
  const polarToCartesian = (radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };
  // 计算三角形刻度坐标点
  function getTriangleSetting() {
    const currentAngle = getAngle(value);
    const maxRadius = innerRadius + 14;
    const minRadius = innerRadius + 11;
    const outerAngle1 = polarToCartesian(maxRadius, currentAngle - 1.5);
    const outerAngle2 = polarToCartesian(maxRadius, currentAngle + 1.5);
    const innerAngle = polarToCartesian(minRadius, currentAngle);
    return [
      outerAngle1.x,
      outerAngle1.y,
      innerAngle.x,
      innerAngle.y,
      outerAngle2.x,
      outerAngle2.y,
    ].join(" ");
  }
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
  function getPoniters() {
    const paths = [];
    sections?.forEach((section) => {
      for (let i = section.min; i < section.max; i++) {
        paths.push(
          <path
            key={i + section.color}
            d={getSetting(innerRadius, getAngle(i), getAngle(i + 1))}
            fill="none"
            stroke={i % 2 !== 0 && i !== 0 ? "white" : section.color}
            strokeWidth={innnerCircleWidth}
            strokeDasharray={[indicatorWidth, indicatorSpace]}
          />,
        );
      }
    });
    return paths;
  }
  return (
    <div
      className={classnames("se-tools-dashboard-section", {
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

        {/* {sections?.map((section, index) => ( */}
        {/*  <path */}
        {/*    key={index} */}
        {/*    d={getSetting( */}
        {/*      innerRadius, */}
        {/*      getAngle(section.min), */}
        {/*      getAngle(section.max), */}
        {/*    )} */}
        {/*    fill="none" */}
        {/*    stroke={section.color} */}
        {/*    strokeWidth={innnerCircleWidth} */}
        {/*    strokeDasharray={[indicatorWidth, indicatorSpace]} */}
        {/*  /> */}
        {/* ))} */}
        {getPoniters()}
        <polygon
          points={getTriangleSetting()}
          fill={currentSection.color}
          stroke={currentSection.color}
          strokeWidth={5}
        />
      </svg>
      <div className="se-tools-dashboard-section-info">
        <div
          className="se-tools-dashboard-section-info-name"
          style={{ top: height * 0.3, ...nameStyle }}
        >
          {name}
        </div>
        <div
          className="se-tools-dashboard-section-info-value"
          style={{
            top: height * 0.4,
            color: currentSection.color,
            ...valueStyle,
          }}
        >
          {value}
        </div>
        <div className="se-tools-dashboard-section-info-extremum">
          <div className="se-tools-dashboard-section-info-extremum-value">
            {min}
          </div>
          <div className="se-tools-dashboard-section-info-extremum-value">
            {max}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SectionDashBoard;
