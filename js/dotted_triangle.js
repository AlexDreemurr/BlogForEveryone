function dottedTriangle(
    deco_block,
    l,
    h,
    layer_color,
    {
        paddingRatio = 0.1,   // 外边距比例
        dotSizeRatio = 0.1,   // 点大小比例
        corner = "bottom-left"
    } = {}
) {
    deco_block.innerHTML = "";

    // ---- 保证外容器尺寸 ----
    deco_block.style.position = "relative";
    deco_block.style.width = l + "px";
    deco_block.style.height = h + "px";

    // ---- 取最小边作为点阵可用区域（保持正方形）----
    const size = Math.min(l, h);

    // four-side padding 一致
    const pad = size * paddingRatio;

    // 点阵的内部区域大小
    const innerSize = size - pad * 2;

    // ---- grid 点阵 ----
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.position = "absolute";

    // 点阵居中
    grid.style.width = size + "px";
    grid.style.height = size + "px";
    grid.style.left = "50%";
    grid.style.top = "50%";
    grid.style.transform = "translate(-50%, -50%)";

    // padding 一致
    grid.style.padding = pad + "px";

    deco_block.appendChild(grid);

    const rows = 7;
    const cols = 7;

    // 点大小
    const dotSize = innerSize * dotSizeRatio;

    // gap 自动计算
    const gap = (innerSize - dotSize * 7) / 6;

    grid.style.gridTemplateColumns = `repeat(7, ${dotSize}px)`;
    grid.style.gridTemplateRows = `repeat(7, ${dotSize}px)`;
    grid.style.columnGap = gap + "px";
    grid.style.rowGap = gap + "px";

    // --- 生成 7 x 7 点 ---
    const dots = [];
    for (let r = 0; r < 7; r++) {
        dots[r] = [];
        for (let c = 0; c < 7; c++) {
            const dot = document.createElement("div");
            dot.style.width = dotSize + "px";
            dot.style.height = dotSize + "px";
            dot.style.backgroundColor = layer_color;
            dot.style.borderRadius = "50%";

            grid.appendChild(dot);
            dots[r][c] = dot;
        }
    }

    // --- 判断某点是否属于三角形 ---
    function shouldShow(r, c, corner) {
        switch (corner) {
            case "bottom-left":   return c <= r;
            case "bottom-right":  return c >= 6 - r;
            case "top-left":      return c <= 6 - r;
            case "top-right":     return c >= r;
        }
    }

    // 隐藏不属于三角形的点
    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
            if (!shouldShow(r, c, corner)) {
                dots[r][c].style.visibility = "hidden";
            }
        }
    }
}
