const renderProduct = async ()=>{
    // Truy cập vị trí cần render.
    const tbody = document.querySelector('tbody');
    tbody.innerHTML ='';
    // Lấy thông tin sản phẩm từ giỏ hàng.
    const cart = localStorage.getItem('cart');
    const products = JSON.parse(cart);
    // console.log(products);
    // đổ dữ liệu vào tbody =>duyệt mảng products
    products.map((product,index)=>{
        // Khởi tạo thẻ tr
        const tr = document.createElement('tr');
        // Xây dựng ND cho thẻ tr
        tr.innerHTML = `
            <td>${index+1}</td>
            <td><img width="60" src ="${product.image}"/></td>
            <td>${product.pid}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.price*product.quantity}</td>
        `;
        tbody.appendChild(tr); //Bổ sung ND thẻ tr vào tbody
    })

}
renderProduct();