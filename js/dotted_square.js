function dottedSquare(deco_block, l, h, layer_color, dotRatio = 0.1, marginRatio = 0.10) {
    deco_block.innerHTML = "";

    // ▶ 确保容器尺寸为 l × h
    deco_block.style.position = "relative";
    deco_block.style.width = l + "px";
    deco_block.style.height = h + "px";

    // ▶ grid 容器
    var grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, auto)';
    grid.style.position = 'absolute';

    deco_block.appendChild(grid);

    // ----------- 新增部分：让点阵保持正方形并居中 -----------
    // 点阵必须正方形，所以取可用空间的最小边
    var size = Math.min(l, h);

    // 统一的 padding
    var padding = size * marginRatio;

    // 点阵的“实际绘制区域”
    var drawSize = size - padding * 2;

    // 将 grid 居中放置
    grid.style.width = size + "px";
    grid.style.height = size + "px";
    grid.style.left = "50%";
    grid.style.top = "50%";
    grid.style.transform = "translate(-50%, -50%)";

    // 内部 padding（上下左右完全一致）
    grid.style.padding = padding + "px";

    // --------------------------------------------------------

    // ---- 点大小 ----
    var dotSize = drawSize * dotRatio;

    // ---- gap 自动计算 ----
    var totalDot = dotSize * 7;
    var totalGap = drawSize - totalDot;
    var gap = totalGap / 6;

    grid.style.rowGap = gap + "px";
    grid.style.columnGap = gap + "px";

    // ---- 生成 49 个点 ----
    for (var i = 0; i < 49; i++) {
        var dot = document.createElement('div');
        dot.style.width = dotSize + "px";
        dot.style.height = dotSize + "px";
        dot.style.backgroundColor = layer_color;
        dot.style.borderRadius = "50%";
        dot.style.margin = "auto";
        grid.appendChild(dot);
    }
}
