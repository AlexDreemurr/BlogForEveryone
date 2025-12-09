function dottedTriangle(
    deco_block,
    l,
    layer_color,
    {
        paddingRatio = 0.1,   // 外边距比例（默认 10%）
        dotSizeRatio = 0.1,   // 点大小比例（默认 10%）
        corner = "bottom-left" // 三角形直角位置
    } = {}
) {
    deco_block.innerHTML = "";

    const pad = l * paddingRatio;

    // 建立 grid 容器
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.position = "relative";
    grid.style.width = l + "px";
    grid.style.height = l + "px";
    grid.style.padding = pad + "px";
    grid.style.paddingTop = pad * 0.5 + 'px';
    deco_block.appendChild(grid);

    const rows = 7;
    const cols = 7;

    // 点大小
    const innerSize = l - pad * 2;
    const dotSize = innerSize * dotSizeRatio;

    // gap
    const gap = (innerSize - dotSize * 7) / 6;

    grid.style.gridTemplateColumns = `repeat(7, ${dotSize}px)`;
    grid.style.gridTemplateRows = `repeat(7, ${dotSize}px)`;
    grid.style.columnGap = gap + "px";
    grid.style.rowGap = gap + "px";

    // --- 生成 7x7 点阵 ---
    const dots = [];
    for (let r = 0; r < 7; r++) {
        dots[r] = [];
        for (let c = 0; c < 7; c++) {
            const dot = document.createElement("div");
            dot.style.width = dotSize + "px";
            dot.style.height = dotSize + "px";
            dot.style.backgroundColor = layer_color;
            dot.style.borderRadius = "50%";
            dot.style.gridRow = r + 1;
            dot.style.gridColumn = c + 1;
            grid.appendChild(dot);
            dots[r][c] = dot;
        }
    }

    // --- 隐藏非三角形点 ---
    function shouldShow(r, c, corner) {
        switch (corner) {
            case "bottom-left":
                return c <= r; // 左下直角
            case "bottom-right":
                return c >= 6 - r; // 右下直角
            case "top-left":
                return c <= 6 - r; // 左上直角
            case "top-right":
                return c >= r; // 右上直角
        }
    }

    // 隐藏不需要的点
    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
            if (!shouldShow(r, c, corner)) {
                dots[r][c].style.visibility = "hidden";
            }
        }
    }
}
