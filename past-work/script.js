const name_input = document.querySelector("#name_input1")
const message = document.querySelector(".message")
const time_title = document.querySelector("p.time_title")

document.querySelector("#b1").addEventListener("click",
    function () {
        let name = name_input.value
        message.innerText = `你好啊，${name}，很高兴见到你。`
    }
)


function updateClock() {
    // 更新标题下方的当前时间
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1);
    let day = String(now.getDate());

    let hour = String(now.getHours()).padStart(2, "0");
    let minute = String(now.getMinutes()).padStart(2, "0");
    let second = String(now.getSeconds()).padStart(2, "0");

    time_title.innerText = `${year}年${month}月${day}日 ${hour}时${minute}分${second}秒`;
}

// 先执行一次更新时间
updateClock()

// 之后每隔1秒更新时间文字
setInterval(updateClock, 1000);
