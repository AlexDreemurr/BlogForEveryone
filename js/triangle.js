function triangle(deco_block, l, h, layer_color, direction = "bottom-right") {
    // 保证容器定位
    deco_block.style.position = "relative";

    // 设置高度
    deco_block.style.width = l + "px";
    deco_block.style.height = h + 'px';

    // 若没有指定宽度，则默认宽 = 高
    if (!deco_block.style.width) {
        deco_block.style.width = l + "px";
    }

    // 创建三角形层
    const tri = document.createElement("div");
    tri.style.position = "absolute";
    tri.style.inset = "0";
    tri.style.background = layer_color;

    // 四方向 clip-path
    let clip = "";
    switch (direction) {
        case "bottom-right":  // bottom-right 右下直角
            clip = "polygon(100% 100%, 0% 100%, 100% 0%)";
            break;
        case "bottom-left":  // bottom-left 左下直角
            clip = "polygon(0% 100%, 0% 0%, 100% 100%)";
            break;
        case "top-right":  // top-right 右上直角
            clip = "polygon(100% 0%, 100% 100%, 0% 0%)";
            break;
        case "top-left":  // top-left 左上直角
            clip = "polygon(0% 0%, 100% 0%, 0% 100%)";
            break;
        default:
            console.warn("triangle(): direction 参数无效，使用默认 br");
            clip = "polygon(100% 100%, 0% 100%, 100% 0%)";
    }

    tri.style.clipPath = clip;

    deco_block.appendChild(tri);
}
