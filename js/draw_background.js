// 找到background元素
var background = document.getElementsByClassName('background')[0];

// 返回指定范围的随机整数
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 根据屏幕大小返回纹样行数
function chooseLine(width) {
    if (width > 900) {
        return 12;
    } else {
        return 15;
    }
}
var color_list = ['var(--red)', 'var(--red)', 'var(--purple)', 'var(--purple)', 'var(--brown)', 'var(--white)', 'var(--gray)', 'var(--yellow)'];
var pattern_list = ['dottedSquare','dottedSquare',  'dottedTriangle','dottedTriangle', 'circle', 'triangle', 'triangle', 'triangle', 'halfCircle', 'quarterCircle'];
var direction_list = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
var direction2_list = ['left', 'right', 'top', 'bottom'];

// 从列表中随机选择元素，already_item可指定不想重复的元素
function randChoice(my_list, already_item = '') {
    var len = my_list.length;
    while (true) {
        var index = randInt(0, len - 1);
        if (my_list[index] != already_item) {
            return my_list[index];
        }
    }
}



// 初始时根据页面尺寸生成deco-box
var width = window.innerWidth;
var height = window.innerHeight;
var lines = chooseLine(width);
var h = Math.floor(height / lines) + (height - Math.floor(height / lines) * lines) / lines;
var n = Math.floor(width / h);
var l = h + (width - n * h) / n;

// 设置css全局变量：动态变化的 h 和 l
document.documentElement.style.setProperty('--grid-h', h + 'px');
document.documentElement.style.setProperty('--grid-l', l + 'px');


background = document.getElementsByClassName("background")[0];
for (var i = 1; i <= lines; i++) {
    var decoration = document.createElement('div');
    decoration.className = 'decoration';
    background.appendChild(decoration);
}

decorations = document.getElementsByClassName("decoration");

// 给定deco_block元素，随机绘制纹饰
function drawPattern(deco_block, l, h) {
    /* deco_block: 父元素  l: 元素的宽(px)  h: 元素的高(px)*/

    /* color: 纹饰的颜色  pattern: 纹饰的种类  direction: 纹饰的生成方向*/
    var color = randChoice(color_list, deco_block.style.backgroundColor);
    var pattern = randChoice(pattern_list);
    var direction = randChoice(direction_list);
    switch (pattern) {
        case 'dottedTriangle':
            dottedTriangle(deco_block, l, h, color, {corner:direction}); 
            break;
        case 'dottedSquare':
            dottedSquare(deco_block, l, h, color);
            break;
        case 'triangle':
            triangle(deco_block, l, h, color, direction);
            break;
        case 'circle':
            circle(deco_block, l, h, color);
            break;
        case 'halfCircle':
            direction = randChoice(direction2_list);
            halfCircle(deco_block, l, h, color, direction);
            break;
        case 'quarterCircle':
            quarterCircle(deco_block, l, h, color, direction);
            break;
    }
}

// 对decorations里面
// 每一个decoration是一行
// 进行每一个小deco-box的纹样绘制
function drawEverything(decorations, h, n, l) {
    for (var j = 0; j < decorations.length; j++) {
        decoration = decorations[j];
    
        for (var i = 1; i <= n; i++) {
            var color = randChoice(color_list);
            decoration.innerHTML +="<div class='deco-block' style='width:"+l+"px; height:"+h+"px; background-color: "+color+"'></div>";
        }

        var deco_blocks = decoration.querySelectorAll(".deco-block");
        for (var i = 0; i < deco_blocks.length; i++) {
            var deco_block = deco_blocks[i];
            drawPattern(deco_block, l, h);
        }
    }
}

drawEverything(decorations, h, n, l);

// 监听窗口大小改变，自动调整deco-box的大小和数量
window.addEventListener('resize', () => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    lines = chooseLine(width);
    var h = Math.floor(height / lines) + (height - Math.floor(height / lines) * lines) / lines;
    var n = Math.floor(width / h);
    var l = h + (width - n * h) / n;
    // 设置css全局变量：动态变化的 h 和 l
    document.documentElement.style.setProperty('--grid-h', h + 'px');
    document.documentElement.style.setProperty('--grid-l', l + 'px');

    decorations = document.getElementsByClassName("decoration");
    for (var i =  0; i < decorations.length; i++) {
        decorations[i].innerHTML = '';
    }
    drawEverything(decorations, h, n, l);
});