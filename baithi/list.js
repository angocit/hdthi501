const renderProduct = async ()=>{
    // Truy cập vị trí cần render.
    const content = document.querySelector('#content .row');
    content.innerHTML ='';
    // Gửi request phương thức GET để lấy danh sách sản phẩm.
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();
    // console.log(products);
    // đổ dữ liệu vào tbody =>duyệt mảng products
    products.map((product,index)=>{
        // Khởi tạo thẻ div
        const div = document.createElement('div');
        div.classList.add('col-sm-3');
        // Xây dựng ND cho thẻ div
        div.innerHTML = `
           <img style="max-width:100%" src = "${product.image}"/>
           <h3>${product.name}</h3>
           <span>${product.price}</span><br>
           <button onclick = "AddtoCart('${product.id}','${product.image}','${product.price}')">Add to cart</button>
        `;
        content.appendChild(div); //Bổ sung ND thẻ tr vào tbody
    })

}
renderProduct();
const AddtoCart =(pid,image,price)=>{
    const product = {
        pid: pid,
        image:image,
        price:price,
        quantity: 1
    }
    // localStorage.removeItem('cart');
    // Kiểm tra tồn tại giỏ hàng chưưa
    const cart = localStorage.getItem('cart');
    console.log(cart);
    if (cart==null){  // Chưa tồn tại
        localStorage.setItem('cart', JSON.stringify([product]));
    }
    else {
        const cartData = JSON.parse(cart);
        console.log(cartData);
        // ktra sản phẩm đã có trong giỏ hàng chưa.
        let ktra  = false;
        let vitri = -1;
        for (let i=0; i<cartData.length; i++){
            // console.log(cartData[i].pid );
            if (cartData[i].pid == pid){
                ktra= true;
                vitri = i;
            }
        }
        if (ktra){
            cartData[vitri].quantity = Number(cartData[vitri].quantity)+1;
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
        else {
            // Push thêm sản phẩm vào cartData
            cartData.push(product);
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
    }
}