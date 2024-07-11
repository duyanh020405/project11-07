import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../../components/css/Admin.css";
import { useSelector, useDispatch } from "react-redux";
import { TbMotorbike } from "react-icons/tb";
import { RiMotorbikeFill } from "react-icons/ri";
import { blockUser, deleteUser, getAllUser } from "../../service/user.service";
import {
  filterUsers,
  resetSearch,
  setSearchTerm,
  setSortOrder,
} from "../../store/reducer/reducer";
import Logo from "../../components/image/logo.png";

export default function Admin() {
  const data: any = useSelector((state: any) => state.reducer.filteredUsers);
  const searchTerm = useSelector((state: any) => state.reducer.searchTerm);
  const dispatch = useDispatch();
  const sortOrder = useSelector((state: any) => state.reducer.users); // Corrected selector

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSortOrder(newSortOrder));
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleBlockUser = (item: any) => {
    swal({
      title: "Are you sure?",
      text: `Bạn có chắc chắn về việc thay đổi trạng thái người dùng này không`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Đã thay đổi, cảm ơn bạn đã xác nhận", {
          icon: "success",
        });
        dispatch(blockUser(item));
      }
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSearch = () => {
    dispatch(filterUsers());
  };

  const handleReset = () => {
    dispatch(resetSearch());
  };

  const handleDelete = (userId: number) => {
    swal({
      title: "Are you sure?",
      text: `Bạn có chắc chắn về việc xóa người dùng này không`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Đã xóa , cảm ơn bạn đã xác nhận", {
          icon: "success",
        });
        dispatch(deleteUser(userId));
        dispatch(getAllUser());
      }
    });
  };

  return (
    <div>
      <div className="admin-container">
        <header className="admin-header-container">
          <h2 className="shop-title">
            <TbMotorbike style={{ fontSize: "2rem" }} />
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
        <div className="admin-navigation">
          <Link to="/admin/creatProducts" className="nav-link">
            Create Product
          </Link>
          <Link to="/admin/shop" className="nav-link">
            Admin Products Management
          </Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm thông tin người dùng"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch}>
              <RiFindReplaceLine />
            </button>
            <button className="search-button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="sort-button-container">
            <button className="sort-button" onClick={handleSort}>
              Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
          </div>
        </div>
      </div>

      <div className="user-management">
        <h2>Quản lý User</h2>
        {data && data.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Age</th>
                <th>PhoneNumber</th>
                <th>Check</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: any) => (
                <tr
                  key={user.id}
                  className={user.block ? "blocked" : "unblocked"}
                >
                  <td>
                    <img
                      src="https://th.bing.com/th/id/OIP.sDKQ_p3tIX8IcCR7VlEyiwAAAA?rs=1&pid=ImgDetMain"
                      alt="user"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.age}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.block ? "Đã chặn" : "Chưa bị chặn"}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      className="block-button"
                      onClick={() => handleBlockUser(user)}
                    >
                      {user.block ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}
