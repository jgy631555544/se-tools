/**

 * @author GuanYu Jin
 * @date 2022/1/13 15:20
 * @description

 */

function classNames(...args) {
  const classes = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      const argType = typeof arg;
      if (argType === "string" || argType === "number") {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(null, arg));
      } else if (argType === "object") {
        Object.keys(arg).forEach((key) => {
          if (Object.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        });
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
