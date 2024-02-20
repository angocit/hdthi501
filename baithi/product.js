const addProduct=async()=>{
    event.preventDefault(); //Ngăn trình duyệt chuyển hướng.
    //Lấy dữ liệu từ ô input.
    const name = document.querySelector('input[name="name"]').value;
    const image = document.querySelector('input[name="image"]').value;
    const cat_id = document.querySelector('select[name="cat_id"]').value;
    const price = document.querySelector('input[name="price"]').value;
    //Gửi request phương thức post lên API
    const res = await fetch('http://localhost:3000/products',{method:'POST',body:JSON.stringify({
        name,image,cat_id,price
    })});
    const data = await res.json();
    if (data.id !==null){
        alert('Thêm sản phẩm thành công');
    }    
}
const renderProduct = async ()=>{
    // Truy cập vị trí cần render.
    const tbody = document.querySelector('tbody');
    tbody.innerHTML ='';
    // Gửi request phương thức GET để lấy danh sách sản phẩm.
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();
    // console.log(products);
    // đổ dữ liệu vào tbody =>duyệt mảng products
    products.map((product,index)=>{
        // Khởi tạo thẻ tr
        const tr = document.createElement('tr');
        // Xây dựng ND cho thẻ tr
        tr.innerHTML = `
            <td>${index+1}</td>
            <td><img width="60" src ="${product.image}"/></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><a class="btn btn-primary" href="edit-product.html?id=${product.id}">Sửa sản phẩm</a><button class="btn btn-danger" onclick="delProduct('${product.id}')">Xóa</abutton></td>
        `;
        tbody.appendChild(tr); //Bổ sung ND thẻ tr vào tbody
    })

}
//Viêt hàm delProduct;
const delProduct =async (pid)=>{
    //Confirm
    if (confirm('Bạn có thực sự muốn xóa?')){
        const res = await fetch(`http://localhost:3000/products/${pid}`,{method: 'DELETE'});
        const data = await res.json();
        if (data.id !==null){
            alert('Xóa thành công');
        }
    }
}
renderProduct();
const Search = async()=>{
    event.preventDefault();
    //Lấy từ khóa 
    const keywords = document.querySelector('input[name="keywords"]').value;
    // console.log(keywords);
    // lấy danh sách sản phẩm
    const res = await fetch('http://localhost:3000/products');
    const products = await res.json();
    // Sử dụng hàm filter để lọc
    const productfilter = products.filter(value=>{
        return value.name.indexOf(keywords)>-1;
    });
    // console.log(productfilter);
    // Truy cập vị trí cần render.
    const tbody = document.querySelector('tbody');
    tbody.innerHTML ='';
    productfilter.map((product,index)=>{
        // Khởi tạo thẻ tr
        const tr = document.createElement('tr');
        // Xây dựng ND cho thẻ tr
        tr.innerHTML = `
            <td>${index+1}</td>
            <td><img width="60" src ="${product.image}"/></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><a class="btn btn-primary" href="edit-product.html?id=${product.id}">Sửa sản phẩm</a><button class="btn btn-danger" onclick="delProduct('${product.id}')">Xóa</abutton></td>
        `;
        tbody.appendChild(tr); //Bổ sung ND thẻ tr vào tbody
    })
}
const FilterByCat=async (e)=>{
    // console.log(e.value);
    // Truy cập vị trí cần render.
    const tbody = document.querySelector('tbody');
    tbody.innerHTML ='';
    // Gửi request phương thức GET để lấy danh sách sản phẩm.
    const res = await fetch('http://localhost:3000/products?cat_id='+e.value);
    const products = await res.json();
    // console.log(products);
    // đổ dữ liệu vào tbody =>duyệt mảng products
    products.map((product,index)=>{
        // Khởi tạo thẻ tr
        const tr = document.createElement('tr');
        // Xây dựng ND cho thẻ tr
        tr.innerHTML = `
            <td>${index+1}</td>
            <td><img width="60" src ="${product.image}"/></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><a class="btn btn-primary" href="edit-product.html?id=${product.id}">Sửa sản phẩm</a><button class="btn btn-danger" onclick="delProduct('${product.id}')">Xóa</abutton></td>
        `;
        tbody.appendChild(tr); //Bổ sung ND thẻ tr vào tbody
    })
}