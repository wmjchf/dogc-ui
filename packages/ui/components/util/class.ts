export const getClassByType = (prefixCls: string, type: string) => {
  return type ? `${prefixCls}--${type}` : prefixCls;
};
