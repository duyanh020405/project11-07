import React from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import '../../components/css/Detail.css';
import { TbMotorbike } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import Logo from "../../components/image/logo.png";
import { useDispatch } from 'react-redux';
import { addItemToCard } from '../../service/user.service';

const ItemOnline = JSON.parse(localStorage.getItem("userOnl") || "{}");

export default function Details() {
  const item = JSON.parse(localStorage.getItem("detail") || "{}");
  const dispatch = useDispatch();

  const handleBuyNow = () => {
    swal(`Mua ngay sản phẩm ${item.name}`);
  };

  const addToCard = (item: any) => {
    swal({
      title: "Are you sure?",
      text: `Ban co muon them san pham ${item.name} vao gio hang khong ?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`San pham ${item.name} duoc them vao gio hang thanh cong !`, {
          icon: "success",
        });
        dispatch(addItemToCard(item));
      } else {
        swal("Cam on ban da xac nhan");
      }
    });
  };
  
  const handleLogout = () => {
    swal({
      title: "Are you sure?",
      text: `Bạn có chắc chắn muốn đăng xuất?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        swal("Bạn đã đăng xuất thành công!", {
          icon: "success",
        });
        localStorage.setItem("userOnl", "");
        // Redirect to login or another page after logout if needed
      }
    });
  };

  return (
    <div className="details-container">
      <div className="navbar-container">
        <div className="navbar">
          <div className="logo-section">
            <img src={Logo} alt="Logo" className="logo" />
            <h2 className="shop-title">
              <TbMotorbike style={{ fontSize: "2rem", color: 'black' }} /> Motorbike Shop
            </h2>
          </div>
          <div className="profile-section">
            <img
              src="https://th.bing.com/th/id/R.4c7978001fc4f9f78a25e9278ea2d617?rik=7eo%2bQfaj2KzAkg&riu=http%3a%2f%2fi2.kym-cdn.com%2fphotos%2fimages%2fnewsfeed%2f000%2f146%2f550%2f1310246424001.jpg&ehk=T%2fkHqG0AJXN8DSR3MnFvxNcu2bKzyqlfgyKNFVa7V4w%3d&risl=&pid=ImgRaw&r=0"
              alt="profile"
              className="profile-image"
            />
            <b style={{ color: "black" }}>Xin chào {ItemOnline.name}</b>
            <IoIosLogOut className="logout-icon" onClick={handleLogout} />
          </div>
        </div>
      </div>
      <div className="details-header">
        <h1>Chi tiết sản phẩm {`${item.name}`}</h1>
      </div>
      <div className="details-content">
        <div className="details-item">
          <img src={item.image} alt={item.name} className="details-image" />
        </div>
        <div className="details-item details-info">
          <h2>Tên sản phẩm : {item.name}</h2>
          <p className="details-price">Giá: {item.price} VNĐ</p>
          <p className="details-description"><b>Mô tả:</b> {item.description}</p>
          <p className="details-quantity"><b>Số lượng :</b> {item.quantity}</p>
          <p className="details-type"><b>Kiểu xe :</b> {item.type}</p>
          <p className="details-state"><b>Loại xe :</b> {item.state}</p>
          <p className="details-category"><b>Dạng xe :</b> {item.category}</p>
          <button className="buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
          <button className="buy-now-button" onClick={() => addToCard(item)}>Thêm vào giỏ hàng</button>
          <Link to="/home">
            <button className="go-back-button">Quay trở lại</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
