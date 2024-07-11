import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProducts } from '../../service/products.service';
import '../../components/css/CreatProduct.css';
import '../../components/css/Admin.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/image/logo.png';
import { TbMotorbike } from 'react-icons/tb';
import { IoIosLogOut } from 'react-icons/io';

const CreatProducts = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<number>(0);
  const [product, setProduct] = useState({
    id: String(id),
    name: '',
    image: '',
    quantity: 1,
    type: '',
    state: '',
    price: 0,
    description: '',
    category: '', // New category state
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'quantity') {
      const numericValue = parseInt(value);
      if (numericValue >= 0) {
        setProduct({
          ...product,
          [name]: numericValue,
        });
      } else {
        alert('Giá hoặc số lượng không được âm, vui lòng nhập lại');
      }
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product.price < 0 || product.quantity < 0) {
      alert('Giá hoặc số lượng không được âm, vui lòng nhập lại');
      return;
    }
    dispatch(addProducts(product));
    setProduct({
      id: String(id + 1),
      name: '',
      image: '',
      quantity: 0,
      type: '',
      state: '',
      price: 0,
      description: '',
      category: '', // Reset category after submission
    });
    setId(id + 1);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          image: reader.result as string, // Lưu dữ liệu URL của ảnh vào state
        });
      };
      reader.readAsDataURL(file); // Đọc file ảnh thành dữ liệu URL
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header-container">
        <h2 className="shop-title">
          <TbMotorbike style={{ fontSize: '2rem' }} />
          Motorbike Shop
        </h2>
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
          <b>Ngon - bổ - rẻ </b>
        </div>
        <div className="profile-container">
          <div className="profile">
            <img
              src="https://th.bing.com/th/id/R.4c7978001fc4f9f78a25e9278ea2d617?rik=7eo%2bQfaj2KzAkg&riu=http%3a%2f%2fi2.kym-cdn.com%2fphotos%2fimages%2fnewsfeed%2f000%2f146%2f550%2f1310246424001.jpg&ehk=T%2fkHqG0AJXN8DSR3MnFvxNcu2bKzyqlfgyKNFVa7V4w%3d&risl=&pid=ImgRaw&r=0"
              alt="profile"
              className="profile-image"
            />
            <b>Xin chào Duy Anh!</b>
          </div>
        </div>
      </header>

      <br />
      <br />
      <nav className="admin-navigation">
        <Link to="/admin/shop" className="nav-link">
          Admin Products Management
        </Link>
        <Link to="/admin" className="nav-link">
          Admin User Management
        </Link>
        <Link to="/">
          <IoIosLogOut style={{ fontSize: '2rem', color: 'red' }} />
        </Link>
      </nav>

      <main className="content">
        <div className="form-container">
          <br />
          <h2>Tạo Sản phẩm mới</h2>
          <br />
          <form onSubmit={handleForm}>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input id="name" name="name" type="text" value={product.name} onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Ảnh</label>
              <input id="image" name="image" type="text" value={product.image} onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Số lượng</label>
              <input id="quantity" name="quantity" type="number" value={product.quantity} onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label htmlFor="type">Loại</label>
              <select id="type" name="type" value={product.type} onChange={handleInput} required>
                <option value="">Chọn loại xe</option>
                <option value="dưới 50cc">Dưới 50cc</option>
                <option value="trên 50cc">Trên 50cc</option>
                <option value="trên 100cc">Trên 100cc</option>
                <option value="trên 180cc">Trên 180cc</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="state">Mô tả</label>
              <select id="state" name="state" value={product.state} onChange={handleInput} required>
                <option value="">Chọn trạng thái</option>
                <option value="cũ">Cũ</option>
                <option value="mới">Mới</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Giá</label>
              <input id="price" name="price" type="number" value={product.price.toString()} onChange={handleInput} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Mô tả chi tiết</label>
              <textarea id="description" name="description" value={product.description} onChange={handleInput} rows={4} />
            </div>
            <div className="form-group">
              <label htmlFor="category">Danh mục</label>
              <select id="category" name="category" value={product.category} onChange={handleInput} required>
                <option value="">Chọn danh mục</option>
                <option value="Xe tay ga">Xe Ga</option>
                <option value="Xe số">Xe Số</option>
                <option value="Xe điện">Xe điện</option>
                <option value="Xe máy điện">Xe máy điện</option>
                <option value="Xe phân khối lớn">Xe điện</option>
              </select>
            </div>
            <button type="submit">Thêm Sản phẩm mới</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatProducts;
