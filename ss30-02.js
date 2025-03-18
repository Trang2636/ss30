let cart = []
let books = [
    {
        id: 1,
        name: "Sách hướng dẫn lập trình JavaScript",
        price: 50000,
        quantity: 10,
        category: "Công nghệ",
    },
    {
        id: 2,
        name: "Nghệ thuật tư duy sắc bén",
        price: 45000,
        quantity: 5,
        category: "Tâm lý học",
    }
]

let menu = `
1. Hiển thị danh sách sách theo thể loại (Người dùng chọn thể loại để xem sách trong danh mục đó).
2. Thêm sách mới vào kho
3. Tìm kiếm sách theo tên hoặc id.
4. Mua sách (Nhập id sách cần mua và số lượng, cập nhật lại kho).
5. Sắp xếp sách theo giá:
6. Tính tổng số lượng sách đã mua và in ra tổng tiền trong giỏ hàng
7. Hiển thị tổng số lượng sách trong kho.
8. Thoát chương trình. 
Mời nhập vào lựa chọn:
`
let choose

while (choose !== 8) {
    choose = +prompt(menu)
    switch (choose) {
        case 1:
            showBookByCate()
            break

        case 2:
            addBook()
            break
        case 3:
            nameOrId()
            break
        case 4:
            buyBook ()
            break
        case 5:
            sortByPrice()
            break
        case 6:
            payMoney()
            break
        case 7:
            displayBook ()
            break
        case 8:
            console.log(`Thanks for using`);
            break
        default:
            console.log(`Không hợp lệ`);
            break

    }
}

function search(key, value) {
    let findIndex = -1;
    for (let i in books) {
        if (value === books[i][key]) {
            findIndex = i;
            break
        }
    }
    return findIndex;
}


function showBookByCate() {
    let input = prompt(`Mời nhập vào danh mục muốn tìm kiếm: `)
    let filterBook = books.filter(function (book, index) {
        return book.category === input
    })
    if (filterBook.length === 0) {
        console.log(`Không có `);
    } else {
        filterBook.forEach(function (book, index) {
            console.log(`Id `, book.id);
            console.log(`Name `, book.name);
            console.log(`Price `, book.price);
            console.log(`Quantity `, book.quantity);
        })
    }

}

function addBook() {
    let id = Math.floor(Math.random()*99999+ new Date().getMilliseconds())
    let name = prompt("Mời bạn nhập vào tên sách");
    let price = prompt("Mời bạn nhập vào giá ");
    let quantity = prompt("Mời bạn nhập vào số lượng sách ");
    let category = prompt("Mời bạn nhập vào thể loại sách  ");
    let book = {
        id: Math.random(),
        name,
        price,
        quantity, category
    }
    books.push(book)
}

function nameOrId() {
    let searchName
    let inputName
    let input = prompt(`Bạn muốn tìm kiếm sách theo tên hay id (nhập vào "tên" or "id")`)
    if (input === "tên") {
        inputName = prompt(`Mời nhập vào tên sách muốn tìm : `)
        searchName = search("name", inputName)
        if (searchName === -1) {
            console.log(`Không có`);
        } else {
            let a = books.findIndex(book => book.name === inputName)

            console.log(`Id `, books[a].id);
            console.log(`Name `, books[a].name);
            console.log(`Price `, books[a].price);
            console.log(`Quantity `, books[a].quantity);
            console.log(`Category `, books[a].category);
        }

    } else if (input === "id") {

        let inputId = + prompt(`Mời nhập vào id sách muốn tìm : `)
        let searchId = search("id", inputId)
        if (searchId === -1) {
            console.log(`Không có`);
        } else {
            let a = books.findIndex(book => book.id === inputId)
            console.log(`Name`, books[a].name);
            console.log(`Price `, books[a].price);
            console.log(`Quantity `, books[a].quantity);
            console.log(`Category `, books[a].category);
        }
    }
}


function sortByPrice() {
    let miniMenu = `
Mời chọn cách sắp xếp : 
1.Tăng dần.
2.Giảm dần.
Mòi nhập vào lựa chọn : 
`
    let miniChoose = +prompt(miniMenu)
    switch (miniChoose) {
        case 1:
            // Sắp xếp giá tăng dần
            let sort1 = books.sort((a, b) => a.price - b.price);
            console.log("Sắp xếp theo giá tăng dần:");
            console.log(sort1);
            break
        case 2:
            // Sắp xếp giá giảm dần
            let sort2 = books.sort((a, b) => b.price - a.price);
            console.log("Sắp xếp theo giá giảm dần:");
            console.log(sort2);
            break
        default:
            console.log("Lựa chọn không hợp lệ!");
            break
    }
}

function buyBook (){
    let inputId = + prompt(`Mời nhập vào id  :`)
    let searchId = search("id", inputId)
    if (searchId == -1) {
        console.log(`Sản phẩm không có trong cửa hàng `);

    } else {
        // console.log(`Id `, inputId + 1);
        // console.log(`Name `, products[inputId].name);
        // console.log(`Price `, products[inputId].price);
        // console.log(`Quantity `, products[inputId].quantity);
        let inputNum = +prompt(`Mời nhập vào số lượng muốn mua : `)
        if (inputNum > books[inputId].quantity) {
            console.log(`Số lượng hàng trong shop không đủ`);
        } else {
            let totalQuantity = books[inputId].quantity - inputNum;
            books[inputId].quantity = totalQuantity
            console.log(`Mua thành công `);
            console.log(`Id `, inputId );
            console.log(`Name `, books[inputId].name);
            console.log(`Price `, books[inputId].price);
            console.log(`Category `, books[inputId].category);
            console.log(`Quantity `, books[inputId].quantity);
            cart.push({
                id: books[searchId].id,
                name: books[searchId].name,
                price: books[searchId].price,
                category: books[searchId].category,
                quantity: inputNum,
            });

        }
    }
}

function payMoney() {
    if (cart.length === 0) {
        console.log(`Không có sản phẩm trong giỏ hàng.`);
    } else {
        let totalAmount = 0;
        console.log(`Danh sách sản phẩm trong giỏ hàng:`);

        cart.forEach((item, index) => {
            console.log(`${index + 1}. Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Total: ${item.total}`);
            totalAmount += item.total;
        });

        console.log(`Tổng số tiền cần thanh toán: ${totalAmount} VND`);
    }
}

// function displayBook (){
//     books.forEach(function (element){
//         console.table(element)
//     })
// }
function displayBook() {
    let totalQuantity = books.reduce((sum, book) => sum + book.quantity, 0);
    console.log(`Tổng số lượng sách trong kho: ${totalQuantity}`);
}

