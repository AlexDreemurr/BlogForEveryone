const name_input = document.querySelector("#name_input1")
const message = document.querySelector(".message")

document.querySelector("#b1").addEventListener("click",
    function () {
        let name = name_input.value
        message.innerText = `你好啊，${name}，很高兴见到你。`
    }
)