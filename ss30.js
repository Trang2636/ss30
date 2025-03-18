let products = [
    {
        id: 1,
        name: "mèn mén",
        price: 20000,
        quantity: 20,
        category: "món ăn dân tộc Mông",
    },
    {
        id: 2,
        name: "mứt",
        price: 80000,
        quantity: 21,
        category: "món ăn dân tộc Kinh",
    },
    {
        id: 3,
        name: "cơm lam",
        price: 40000,
        quantity: 15,
        category: "món ăn dân tộc Mông",
    },
    {
        id: 4,
        name: "bánh đậu xanh",
        price: 60000,
        quantity: 30,
        category: "món ăn dân tộc Kinh",
    }
];
let cart = []

let menu = `
1.Hiển thị các sản phẩm theo tên danh mục.
2.Chọn sản phẩm để mua bằng cách nhập id sản phẩm.
    a.Sản phẩm không có trong cửa hàng hiển thị thông báo.
    b.Sản phẩm có trong cửa hàng
        i.Cho người dùng nhập số lượng sản phẩm muốn mua, mua thành công số lượng sản phẩm trong cửa hàng sẽ bị trừ đi.
        ii.Số lượng sản phẩm trong cửa hàng = 0 hoặc không đủ hiển thị thông báo.
3.Sắp xếp các sản phẩm trong cửa hàng theo giá:
    a.Tăng dần.
    b.Giảm dần.
4.Tính số tiền thanh toán trong giỏ hàng.
5.Thoát.
Mời nhập vào lựa chọn của bạn : 
`
let choose
while (choose !== 5) {
    choose = + prompt(menu)
    switch (choose) {
        case 1:
            showProductByCate()
            break
        case 2:
            chooseById()
            break
        case 3:
            sortByPrice()
            break
        case 4:
            payMoney ()
            break
        case 5:
            console.log(`Thanks for using !`);

            break
        default:
            console.log(`Không hợp lệ `);

    }
}

function search(key, value) {
    let findIndex = -1;
    for (let i in products) {
        if (value === products[i][key]) {
            findIndex = i;
            break
        }
    }
    return findIndex;
}


function showProductByCate() {
    let input = prompt(`Mời nhập vào danh mục muốn tìm kiếm: `)
    let filterProduct = products.filter(function (product, index) {
        return product.category === input
    })
    if (filterProduct.length === 0) {
        console.log(`Không có `);
    } else {
        filterProduct.forEach(function (product, index) {
            console.log(`Id `, product.id);
            console.log(`Name `, product.name);
            console.log(`Price `, product.price);
            console.log(`Quantity `, product.quantity);
        })
    }

}

function chooseById() {
    let inputId = + prompt(`Mời nhập vào id muốn chọn sản phẩm :`)
    let searchId = search("id", inputId)
    if (searchId == -1) {
        console.log(`Sản phẩm không có trong cửa hàng `);

    } else {
        // console.log(`Id `, inputId + 1);
        // console.log(`Name `, products[inputId].name);
        // console.log(`Price `, products[inputId].price);
        // console.log(`Quantity `, products[inputId].quantity);
        let inputNum = +prompt(`Mời nhập vào số lượng muốn mua : `)
        if (inputNum > products[inputId].quantity) {
            console.log(`Số lượng hàng trong shop không đủ`);
        } else {
            let totalQuantity = products[inputId].quantity - inputNum;
            products[inputId].quantity = totalQuantity
            console.log(`Mua thành công `);
            console.log(`Id `, inputId );
            console.log(`Name `, products[inputId].name);
            console.log(`Price `, products[inputId].price);
            console.log(`Quantity `, products[inputId].quantity);
            cart.push({
                id: products[searchId].id,
                name: products[searchId].name,
                price: products[searchId].price,
                quantity: inputNum,
            });

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
            let sort1 = products.sort((a, b) => a.price - b.price);
            console.log("Sắp xếp theo giá tăng dần:");
            console.log(sort1);
            
            break
        case 2:
            // Sắp xếp giá giảm dần
            let sort2 = products.sort((a, b) => b.price - a.price);
            console.log("Sắp xếp theo giá giảm dần:");
            console.log(sort2);
            break
        default:
            console.log("Lựa chọn không hợp lệ!");
            break
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

