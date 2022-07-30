var input = document.querySelector('input[type="text"]')
var container = document.querySelector('div')
var a =1 

    input.onchange = (e) => {
        container.innerHTML = 
        `
            <p>nhập tuổi của bạn</p>
            <div>
                <input type="text">
            </div>
            <p>bạn đã ${e.target.value} tuổi rồi</p>
            <p>tải lại trang để chơi tiếp</p>
            <a href="">tải lại trang</a>
        `
    }

