import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import "dogc/es/drag/style/index.css";

type PosMap =
  | "e"
  | "w"
  | "s"
  | "n"
  | "ne"
  | "nw"
  | "se"
  | "sw"
  | "move"
  | "rotate"
  | undefined;
interface OriPos extends React.CSSProperties {
  cX: number;
  cY: number;
}
export type IDragProps = {
  prefixCls?: string;
  container?: HTMLElement | string;
  isStatic?: boolean;
  position?: [number, number];
  size?: [number, number];
  zIndex?: number;
  children?: React.ReactNode;
  onDragStart?: (oriPos: OriPos) => void;
  onDragStop?: (oriPos: React.CSSProperties) => void;
} & ICommonComponentProps;

const Drag: React.FC<IDragProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    className,
    position = [0, 0],
    size = [100, 100],
    zIndex = 1,
    children,
    onDragStart,
    onDragStop,
    container = document.body,
    isStatic,
    style: wrapStyle,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("drag", customPrefixCls);
  const classes = classNames(prefixCls);
  const itemClasses = `${prefixCls}-item`;

  const [style, setStyle] = useState<React.CSSProperties>({
    left: position[0],
    top: position[1],
    width: size[0],
    height: size[1],
    zIndex,
  });

  const dragBox = useRef<HTMLElement | null>(null);
  const isDown = useRef<boolean>(false);
  const direction = useRef<PosMap>();
  const points = ["e", "w", "s", "n", "ne", "nw", "se", "sw"];
  // init origin positon
  const oriPos = useRef<OriPos>({
    top: 0, // element position
    left: 0,
    cX: 0, // mouse position
    cY: 0,
  });
  const getTanDeg = (tan: number) => {
    let result = Math.atan(tan) / (Math.PI / 180);
    result = Math.round(result);
    return result;
  };

  function transform(
    direction: PosMap,
    oriPos: OriPos,
    pos: { x: number; y: number }
  ) {
    const style = { ...oriPos };
    const offsetX = pos.x - oriPos.cX;
    const offsetY = pos.y - oriPos.cY;

    switch (direction) {
      // move
      case "move": {
        const top = ((oriPos.top as number) || 0) + offsetY;
        const left = ((oriPos.left as number) || 0) + offsetX;
        const width = dragBox.current?.offsetWidth || 0;
        const height = dragBox.current?.offsetHeight || 0;
        // Limit the height of the artboard - the height of the element - that must be moved within this range
        style.top = Math.max(
          0,
          Math.min(top, height - ((style.height as number) || 0))
        );
        style.left = Math.max(
          0,
          Math.min(left, width - ((style.width as number) || 0))
        );
        break;
      }
      // east
      case "e":
        style.width = ((style.width as number) || 0) + offsetX;
        return style;
      // west
      case "w":
        // Increase the width, position synchronization left shift
        style.width = ((style.width as number) || 0) - offsetX;
        style.left = ((style.left as number) || 0) + offsetX;
        return style;
      // south
      case "s":
        style.height = ((style.height as number) || 0) + offsetY;
        return style;
      // north
      case "n":
        style.height = ((style.height as number) || 0) - offsetY;
        style.top = ((style.top as number) || 0) + offsetY;
        break;
      // northeast
      case "ne":
        style.height = ((style.height as number) || 0) - offsetY;
        style.top = ((style.top as number) || 0) + offsetY;
        style.width = ((style.width as number) || 0) + offsetX;
        break;
      // northwest
      case "nw":
        style.height = ((style.height as number) || 0) - offsetY;
        style.top = ((style.top as number) || 0) + offsetY;
        style.width = ((style.width as number) || 0) - offsetX;
        style.left = ((style.left as number) || 0) + offsetX;
        break;
      // southeast
      case "se":
        style.height = ((style.height as number) || 0) + offsetY;
        style.width = ((style.width as number) || 0) + offsetX;
        break;
      // southwest
      case "sw":
        style.height = ((style.height as number) || 0) + offsetY;
        style.width = ((style.width as number) || 0) - offsetX;
        style.left = ((style.left as number) || 0) + offsetX;
        break;
      case "rotate": {
        // The center point of the element, x, y, is calculated as the coordinate origin first
        const x =
          ((style.width as number) || 0) / 2 + ((style.left as number) || 0);
        const y =
          ((style.height as number) || 0) / 2 + ((style.top as number) || 0);
        // The current mouse coordinates
        const x1 = pos.x;
        const y1 = pos.y;
        // Using triangular functions, there are bugs to optimize
        style.transform = `rotate(${getTanDeg((y1 - y) / (x1 - x))}deg)`;
        break;
      }
    }
    return style;
  }

  // mousedown
  const onMouseDown = useCallback(
    (dir: PosMap, e: React.MouseEvent<HTMLElement>) => {
      // stop the event bubbles
      e.stopPropagation();

      direction.current = dir;
      isDown.current = true;

      const cY = e.clientY;
      const cX = e.clientX;
      oriPos.current = {
        ...style,
        cX,
        cY,
      };
      onDragStart && onDragStart(oriPos.current);
    },
    [style]
  );
  const onTouchStart = useCallback(
    (dir: PosMap, e: React.TouchEvent<HTMLElement>) => {
      e.stopPropagation();

      direction.current = dir;
      isDown.current = true;

      const cY = e.targetTouches[0].pageY;
      const cX = e.targetTouches[0].pageX;
      oriPos.current = {
        ...style,
        cX,
        cY,
      };
      onDragStart && onDragStart(oriPos.current);
    },
    [style]
  );

  // The mouse is lifted
  const onMouseUp = useCallback(() => {
    isDown.current = false;
    onDragStop && onDragStop(style);
  }, [style]);

  useEffect(() => {
    dragBox.current = (typeof container === "object"
      ? container
      : document.querySelector(container)) as HTMLElement;
    if (
      ["relative", "absolute", "fixed"].indexOf(
        dragBox.current.style.position
      ) < 0
    ) {
      dragBox.current.style.position = "relative";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      // Determine if the mouse is holding down
      if (!isDown.current) return;
      const newStyle = transform(direction.current, oriPos.current, {
        x: event.clientX,
        y: event.clientY,
      });
      setStyle(newStyle);
    });

    window.addEventListener("touchmove", (e) => {
      // stop the event bubbles
      e.stopPropagation();

      // Determine if the mouse is holding down
      if (!isDown.current) return;

      const y = e.targetTouches[0].pageY;
      const x = e.targetTouches[0].pageX;
      const newStyle = transform(direction.current, oriPos.current, { x, y });
      setStyle(newStyle);
    });
  }, []);
  return (
    <div className={classNames(classes, className)} style={wrapStyle}>
      {isStatic ? (
        <div className={itemClasses} style={style}>
          {children}
        </div>
      ) : (
        <div
          className={itemClasses}
          style={style}
          onMouseDown={(e) => onMouseDown("move", e)}
          onMouseUp={onMouseUp}
          onTouchStart={(e) => onTouchStart("move", e)}
          onTouchEnd={onMouseUp}
        >
          <div className="drag-item-child">{children}</div>
          {!isStatic &&
            points.map((item) => (
              <div
                className={classNames("control-point", `point-${item}`)}
                key={item}
                onMouseDown={(e: React.MouseEvent<HTMLElement>) =>
                  onMouseDown(item as PosMap, e)
                }
                onTouchStart={(e: React.TouchEvent<HTMLElement>) =>
                  onTouchStart(item as PosMap, e)
                }
              ></div>
            ))}
        </div>
      )}
    </div>
  );
};
export default Drag;
