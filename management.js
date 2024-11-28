// Mảng lưu người dùng
const array_list = [];
let is_Status = false;
let idusers = null;

// Hàm tạo mã ID ngẫu nhiên random khong trung lap id truoc da co trong mang
function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    let isDuplicate = false;
    do {
        for (let i = 0; i < length; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        for (let i = 0; i < array_list.length; i++) {
            if (array_list[i].id === id) {
                isDuplicate = true;
                break;
            }
        }
    } while (isDuplicate);

    return id;
}

// Hàm lưu người dùng khi nhấn nút btnSave

function btnSave() {
    if (statusbar) {
        const index = array_list.findIndex(function (users) {
            return users.id === idusers;
        });

        const currentTime = new Date().toLocaleTimeString();

        if (index !== -1) {
            // Nếu tìm thấy, cập nhật đối tượng trong mảng
            array_list[index] = {
                id: array_list[index].id,
                name: document.getElementById("name").value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                dateOfBirth: `${document.getElementById("dayInput").value} / ${document.getElementById("monthInput").value} / ${document.getElementById("yearInput").value}`,
                phone: document.getElementById("numberPhone").value,
                money: document.getElementById("numberMoney").value,
                introduce: document.getElementById("introduce").value,
                image: document.getElementById("linkImg").value,
                timestamp: currentTime
            };

            spaceVoid();
            displayProduct();
            is_Status = false;
            idusers = null;
            document.getElementById("updater").innerText = "Lưu Thông Tin";
        } else {

            const newUser = {
                id: generateRandomID(7),
                name: document.getElementById("name").value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                dateOfBirth: `${document.getElementById("dayInput").value} / ${document.getElementById("monthInput").value} / ${document.getElementById("yearInput").value}`,
                phone: document.getElementById("numberPhone").value,
                money: document.getElementById("numberMoney").value,
                introduce: document.getElementById("introduce").value,
                image: document.getElementById("linkImg").value,
                timestamp: currentTime
            };

            array_list.push(newUser);
            displayProduct();
            spaceVoid();
        }
    }
}


// ham hien thi du lieu len table
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
                <td>${user.timestamp}</td> 
                <td>
                    <button class="cssbtnedit" onclick="editProduct('${user.id}')">Edit</button>
                    <button class="cssbtndelete" onclick="deleteProduct('${user.id}')">Delete</button>
       
                </td>
            </tr>`;
    }

    content.innerHTML = tbody;
}

// ham xoa du lieu
function deleteProduct(id) {
    const index = array_list.findIndex(function (users) {
        return users.id === id;
    });

    if (index !== -1) {
        array_list.splice(index, 1);
        displayProduct();
    }
}

// ham edit

function editProduct(id) {
    const index = array_list.find(function (users) {
        return users.id === id;
    });
    if (index) {
        document.getElementById("name").value = index.name;
        document.querySelector(`input[name="gender"][value="${index.gender}"]`).checked = true;
        const [day, month, year] = index.dateOfBirth.split(" / ");
        document.getElementById("dayInput").value = day;
        document.getElementById("monthInput").value = month;
        document.getElementById("yearInput").value = year;
        document.getElementById("numberPhone").value = index.phone;
        document.getElementById("numberMoney").value = index.money;
        document.getElementById("introduce").value = index.introduce;
        document.getElementById("linkImg").value = index.image;


        is_Status = true;
        idusers = id;
        document.getElementById("updater").innerText = "Cập Nhập";

    }
}


// ham nay de dat lai ""
function spaceVoid() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"][value="Nam"]').checked = true;
    document.getElementById("dayInput").value = "";
    document.getElementById("monthInput").value = "";
    document.getElementById("yearInput").value = "";
    document.getElementById("numberPhone").value = "";
    document.getElementById("numberMoney").value = "";
    document.getElementById("introduce").value = "";
    document.getElementById("linkImg").value = "";

}

document.getElementById('sort_select').addEventListener('change', function () {
    const sortOption = this.value;

    switch (sortOption) {
        case 'a-z':
            array_list.sort(function (a, b) {
                return a.name.localeCompare(b.name);  // Đảm bảo dấu chấm phẩy ở cuối dòng
            });
            break;
        case 'z-a':
            array_list.sort(function (a, b) {
                return b.name.localeCompare(a.name);  // Đảm bảo dấu chấm phẩy ở cuối dòng
            });
            break;
    }

    displayProduct();
});






