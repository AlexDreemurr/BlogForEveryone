function halfCircle(deco_block, l, h, layer_color, direction = "left") {
  // container 基本设置
  deco_block.style.position = deco_block.style.position || "relative";
  deco_block.style.width = l + "px";
  deco_block.style.height = h + "px";
  // 保证能看到放在边界外的那半圆
  deco_block.style.overflow = "visible";

  // 创建圆（我们先生成一个完整的圆，再用 clip-path 取半）
  const circ = document.createElement("div");
  circ.style.position = "absolute";
  circ.style.background = layer_color;
  circ.style.borderRadius = "50%";
  circ.style.pointerEvents = "none"; // 不挡事件

  let diameter;

  switch (direction) {
    case "left":
      // 直径 = 高度 h；放置使圆的中线（直径）恰好在容器 left 边上
      diameter = h;
      circ.style.width = diameter + "px";
      circ.style.height = diameter + "px";
      // 把圆心放在容器左侧外半径处：left = -diameter/2
      circ.style.left = (-diameter / 2) + "px";
      // 垂直居中：top = (h - diameter)/2，注意这里 diameter==h 通常为 0，但保持通用
      circ.style.top = ((h - diameter) / 2) + "px";
      // 只显示圆的右半（直径在 left 边）
      circ.style.clipPath = "inset(0 0 0 50%)";
      break;

    case "right":
      diameter = h;
      circ.style.width = diameter + "px";
      circ.style.height = diameter + "px";
      // 把圆心放在容器右侧外半径处：left = l - diameter/2
      circ.style.left = (l - diameter / 2) + "px";
      circ.style.top = ((h - diameter) / 2) + "px";
      // 只显示圆的左半（直径在 right 边）
      circ.style.clipPath = "inset(0 50% 0 0)";
      break;

    case "top":
      diameter = l;
      circ.style.width = diameter + "px";
      circ.style.height = diameter + "px";
      // 把圆心放在容器上方外半径处：top = -diameter/2
      circ.style.top = (-diameter / 2) + "px";
      circ.style.left = ((l - diameter) / 2) + "px";
      // 只显示圆的下半（直径在 top 边）
      circ.style.clipPath = "inset(50% 0 0 0)";
      break;

    case "bottom":
      diameter = l;
      circ.style.width = diameter + "px";
      circ.style.height = diameter + "px";
      // 把圆心放在容器下方外半径处：top = h - diameter/2
      circ.style.top = (h - diameter / 2) + "px";
      circ.style.left = ((l - diameter) / 2) + "px";
      // 只显示圆的上半（直径在 bottom 边）
      circ.style.clipPath = "inset(0 0 50% 0)";
      break;

    default:
      console.warn("halfCircle(): direction 参数无效，使用 left");
      return halfCircle(deco_block, l, h, layer_color, "left");
  }

  deco_block.appendChild(circ);
}
