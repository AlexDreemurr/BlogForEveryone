function dottedSquare(deco_block, l, layer_color, dotRatio = 0.1, marginRatio = 0.10) {
    // dotRatio: 点占内部空间比例
    // marginRatio: 页边距占 l 的比例，比如 0.05 = 5%
    
    // 清空内容
    deco_block.innerHTML = "";

    // grid 外容器
    var grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, auto)';
    
    // ---- 页边距（padding） ----
    // 可调的“边距”，保证点不被吞掉
    var padding = l * marginRatio;
    grid.style.padding = padding + "px";

    // 容器尺寸
    grid.style.width = l + "px";
    grid.style.height = l + "px";

    deco_block.appendChild(grid);

    // 可用的内部空间
    var innerWidth = l - padding * 2;
    var innerHeight = l - padding * 2;
    // 为保证点完全显示，取最小值
    var innerSize = Math.min(innerWidth, innerHeight);

    // ---- 点大小 ----
    var dotSize = innerSize * dotRatio;

    // ---- gap 自动计算 ----
    // 7 个点占 dotSize*7, 6 个间距
    var totalDot = dotSize * 7;
    var totalGap = innerSize - totalDot;
    var gap = totalGap / 6;

    grid.style.rowGap = gap + "px";
    grid.style.columnGap = gap + "px";

    // ---- 创建 49 个点 ----
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

