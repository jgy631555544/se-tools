/**

 * @author GuanYu Jin
 * @date 2022/1/13 15:20
 * @description

 */

function classNames() {
  const classes = [];

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];
    if (!arg) continue;
    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      classes.push(classNames.apply(null, arg));
    } else if (argType === "object") {
      for (const key in arg) {
        if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}

function getCalcClassName(defaultClassName, props) {
  return classNames({
    [defaultClassName]: true,
    [props.className]: !!props.className,
  });
}

export { classNames, getCalcClassName };
