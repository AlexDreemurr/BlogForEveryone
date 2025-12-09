function circle(deco_block, l, layer_color, marginRatio = 0.10) {
    // marginRatio: 页边距占 l 的比例，比如 0.05 = 5%
    
    // 清空内容
    deco_block.innerHTML = "";
    deco_block.style.padding = l * marginRatio + "px";
    dot = document.createElement("div");
    
    dot.style.borderRadius = '100%';
    dot.style.width = l * (1 - 2 * marginRatio);
    dot.style.height = l * (1 - 2 * marginRatio);
    dot.style.backgroundColor = layer_color;
    deco_block.appendChild(dot);
    
}

