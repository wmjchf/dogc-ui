import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import './Table.less';

const Table: React.FC<any> = ({ children }) => {
  const container = useRef<HTMLDivElement>(null);
  const [leftFolded, setLeftFolded] = useState(false);
  const [rightFolded, setRightFolded] = useState(false);

  // watch content scroll to render folded shadow
  useEffect(() => {
    const elm = container.current;
    const handler = throttle(() => {
      setLeftFolded((elm?.scrollLeft || 0) > 0);
      setRightFolded(
        (elm?.scrollLeft || 0) <
          (elm?.scrollWidth || 0) - (elm?.offsetWidth || 0),
      );
    }, 100);

    handler();
    elm?.addEventListener('scroll', handler);
    window.addEventListener('resize', handler);

    return () => {
      elm?.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <div className="__dumi-default-table">
      <div
        className="__dumi-default-table-content"
        ref={container}
        data-left-folded={leftFolded || undefined}
        data-right-folded={rightFolded || undefined}
      >
        <table>{children}</table>
      </div>
    </div>
  );
};

export default Table;
