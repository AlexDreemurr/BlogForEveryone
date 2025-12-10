function circle(deco_block, l, h, layer_color, marginRatio = 0.10) {
    // 清空
    deco_block.innerHTML = "";
    deco_block.style.padding = "";  // 用 margin，不用 padding，否则高宽会影响
    deco_block.style.position = "relative";

    const dot = document.createElement("div");

    // 椭圆尺寸
    const w = l * (1 - 2 * marginRatio);
    const h2 = h * (1 - 2 * marginRatio);

    dot.style.width = w + "px";
    dot.style.height = h2 + "px";
    dot.style.backgroundColor = layer_color;
    dot.style.borderRadius = "50%"; // 自动变椭圆
    dot.style.position = "absolute";
    dot.style.left = "50%";
    dot.style.top = "50%";
    dot.style.transform = "translate(-50%, -50%)";

    deco_block.appendChild(dot);
}

