function quarterCircle(deco_block, l, h, layer_color, direction = "bottom-left") {
  // 确保容器定位与尺寸
  deco_block.style.position = deco_block.style.position || "relative";
  deco_block.style.width = l + "px";
  deco_block.style.height = h + "px";

  // 保证内部绘制不溢出外部（也不会影响相邻元素）
  deco_block.style.overflow = "hidden";

  // 先移除之前可能添加的同类 svg（可选，避免重复）
  const prev = deco_block.querySelector(':scope > .__qc_svg__');
  if (prev) prev.remove();

  // 创建 svg（宽高等于容器）
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", l);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", `0 0 ${l} ${h}`);
  svg.setAttribute("preserveAspectRatio", "none"); // 使 svg 在元素内拉伸，不保持比例
  svg.classList.add("__qc_svg__");
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.style.pointerEvents = "none"; // 不拦截事件

  // 计算椭圆中心（放在对应角上）
  let cx = 0, cy = 0;
  switch (direction) {
    case "top-left":
      cx = 0; cy = 0;
      break;
    case "top-right":
      cx = l; cy = 0;
      break;
    case "bottom-left":
      cx = 0; cy = h;
      break;
    case "bottom-right":
      cx = l; cy = h;
      break;
    default:
      console.warn("quarterCircle(): invalid direction, using bottom-left");
      cx = 0; cy = h;
  }

  // 创建一个椭圆，rx = l, ry = h -> 这样椭圆足够大以填满两条边
  const ellipse = document.createElementNS(svgNS, "ellipse");
  ellipse.setAttribute("cx", String(cx));
  ellipse.setAttribute("cy", String(cy));
  ellipse.setAttribute("rx", String(l));
  ellipse.setAttribute("ry", String(h));
  ellipse.setAttribute("fill", layer_color);

  // 将椭圆加入 svg（SVG 自身会裁切到 viewBox，因此不会外溢）
  svg.appendChild(ellipse);
  deco_block.appendChild(svg);

  // 返回 svg 节点，方便后续修改/移除
  return svg;
}
