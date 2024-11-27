// Mảng lưu người dùng
const array_list = [];

// Hàm tạo mã ID ngẫu nhiên random
function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id;
    do {
        id = '';
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (array_list.some(user => user.id === id));
    return id;
}

// Hàm lưu người dùng khi nhấn nút btnSave

function btnSave(){
    const _name = document.getElementById("name").value;
    const _gender = document.querySelector('input[name="gender"]:checked').value;
    const _day_input = document.getElementById("dayInput").value;
    const _month_input = document.getElementById("monthInput").value;
    const _year_input = document.getElementById("yearInput").value;
    const _number_phone = document.getElementById("numberPhone").value;
    const _number_money = document.getElementById("numberMoney").value;
    const _introduce = document.getElementById("introduce").value;
    const _link_img = document.getElementById("linkImg").value;


    const newUser = {
        id: generateRandomID(7),
        name: _name,
        gender: _gender,
        dateOfBirth: `${_day_input} / ${_month_input} / ${_year_input}`,
        phone: _number_phone,
        money: _number_money,
        introduce: _introduce,
        image: _link_img,
    };

        array_list.push(newUser);
        displayProduct();

    function displayProduct() {
        const content = document.getElementById("content");
        let tbody = "";

        for (let i = 0; i < array_list.length; i++) {
            const user = array_list[i];
            tbody += `
            <tr>
                <td>${i + 1}</td>
                <td>${user.id}</td>  
                <td>${user.name}</td> 
                <td>${user.gender}</td>  
                <td>${user.dateOfBirth}</td>  
                <td>${user.phone}</td>  
                <td>${user.money}</td>  
                <td>${user.introduce}</td>  
                <td>
                    <img src="${user.image}" class="cssimg" alt="hình ảnh">
                </td>  
                <td>
                    <button class="cssbtnedit" >Edit</button>
                    <button class="cssbtndelete" onclick="deleteProduct(${user.id})">Delete</button>
       
                </td>
            </tr>`;
        }

        content.innerHTML = tbody;
    }

    function deleteProduct(id) {

    }
}


