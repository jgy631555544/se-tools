const theme = {
  "@lifeGreen": "#3DCD58",
  "@baiyinBlue": "#284E98",
  // primary
  "@primary-color": "@baiyinBlue",
  "@primary-color-hover": "tint(@primary-color, 20%)",
  "@primary-color-bg": "tint(@primary-color, 80%)",
  "@success-color": "@primary-color",
  // border
  "@border-color-base": "#E6E6E6",
  // disabled
  "@disabled-color": "#E6E6E6",
  "@disabled-bg": "#F2F2F2",
  // input
  "@input-height-base": "36px",
  "@input-height-lg": "50px",
  "@input-height-sm": "28px",
  // text
  "@heading-color": "#333333",
  // "@text-color ": "#666666",
  "@text-color-secondary": "#999999",
  // 注意后面有个空格和上面的disabled-color不一样
  // "@disabled-color ": "#c0c0c0",
  // btn
  "@btn-height-base": "36px",
  "@btn-height-lg": "50px",
  "@btn-height-sm": "28px",
  // font-family
  "@font-family":
    "PingFang SC, Microsoft YaHei Light, Microsoft YaHei, arial, sans-serif",
};
export default theme;
