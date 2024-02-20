// Lấy thông tin sản phẩm đưa vào ô input
// - Viết hàm lấy thông tin sản phẩm và đưa vào input
const get_Product=async ()=>{
    // Lấy thông tin id từ url.
    const params = new URLSearchParams(location.search);
    const pid = params.get('id');
    // console.log(pid);
    // Call API lấy thông tin sản phẩm
    const res = await fetch(`http://localhost:3000/products/${pid}`);
    const product = await res.json();
    console.log(product);
    // Đổ DL vào input
    document.querySelector('input[name="name"]').value = product.name;
    document.querySelector('input[name="image"]').value= product.image;
    document.querySelector('select[name="cat_id"]').value= product.cat_id;
    document.querySelector('input[name="price"]').value= product.price;
}
get_Product();
const updateProduct=()=>{
    // Lấy thông tin id sản phẩm.
    const params = new URLSearchParams(location.search);
    const pid = params.get('id');
    //Lấy các giá trị cần cập nhật
    const name = document.querySelector('input[name="name"]').value;
    const image = document.querySelector('input[name="image"]').value;
    const cat_id = document.querySelector('select[name="cat_id"]').value;
    const price = document.querySelector('input[name="price"]').value;
    // gửi request phương thức put để cập nhật
    fetch(`http://localhost:3000/products/${pid}`,{method: 'PUT',body: JSON.stringify({
        name, image,cat_id,price
    })});
}