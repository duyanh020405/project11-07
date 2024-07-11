import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbMotorbike } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { RxReset } from "react-icons/rx";
import {
  FaEnvelope,
  FaFacebook,
  FaGem,
  FaGithub,
  FaGoogle,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaPrint,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import Logo from "../../components/image/logo.png";
import { getAllProducts } from "../../service/products.service";
import { addItemToCard } from "../../service/user.service";
import "../../components/css/Home.css";
import { Link, Navigate } from "react-router-dom";
import s1 from "../../components/image/s1.webp";
import s2 from "../../components/image/s2.jpg";
import s3 from "../../components/image/s3.jpg";
import s4 from "../../components/image/s4.jpg";
import s5 from "../../components/image/1579687460-924-suzuki-raider-1579616125-width660height400.jpg";
import s6 from "../../components/image/Dapp7L91V-11.jpg";
import s7 from "../../components/image/xe-moto-co-dien-gia-re-1280x720.jpg";

export default function Home() {
  const { products } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const ItemOnline = JSON.parse(localStorage.getItem("userOnl") || "{}");
  const idUser = ItemOnline.id;

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all"); // State for selected category

  const adImages = [s1, s2, s3, s4, s5, s6, s7];

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-");
      filtered = filtered.filter(
        (item: any) => item.price >= min && item.price <= max
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item: any) => item.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedPriceRange, selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === adImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [adImages.length]);

  const handleChangePage = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevAd = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === 0 ? adImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextAd = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === adImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    filteredProducts.length > 0
      ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
      : products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    (filteredProducts.length > 0 ? filteredProducts.length : products.length) /
      productsPerPage
  );

  const searchItem = () => {
    setCurrentPage(1);
    let filtered = products.filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-");
      filtered = filtered.filter(
        (item: any) => item.price >= min && item.price <= max
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item: any) => item.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSelectedPriceRange("all");
    setSelectedCategory("all");
    setFilteredProducts([]);
    setCurrentPage(1);
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

  const toDetail = (item: any) => {
    localStorage.setItem("detail", JSON.stringify(item));
    localStorage.setItem("idUser", JSON.stringify(item.id));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const logOut = () => {
    swal({
      title: "Are you sure?",
      text: `Bạn có chắc chắn muốn đăng xuất?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Cảm ơn bạn đã xác nhận!", {
          icon: "success",
        });
        localStorage.setItem("userOnl", "");
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      } else {
        swal("Cảm ơn bạn đã xác nhận!");
      }
    });
  };

  return (
    <div>
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="Logo" className="logo" />
              <span className="shop-title">Motorbike Shop</span>
              <TbMotorbike style={{ fontSize: "5rem" }} />
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <form className="d-flex ms-auto">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Tìm kiếm..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={searchItem}
                >
                  <FaSearch />
                </button>
                <button
                  className="btn btn-outline-secondary ms-2"
                  type="button"
                  onClick={resetSearch}
                >
                  <RxReset />
                </button>
              </form>
            </div>
          </div>
          <div className="profile-section d-flex align-items-center">
          <img
            src="https://th.bing.com/th/id/R.4c7978001fc4f9f78a25e9278ea2d617?rik=7eo%2bQfaj2KzAkg&riu=http%3a%2f%2fi2.kym-cdn.com%2fphotos%2fimages%2fnewsfeed%2f000%2f146%2f550%2f1310246424001.jpg&ehk=T%2fkHqG0AJXN8DSR3MnFvxNcu2bKzyqlfgyKNFVa7V4w%3d&risl=&pid=ImgRaw&r=0"
            alt="profile"
            className="profile-image"
          />
          <span className="ms-2 fw-bold text-black">
            Xin chào {ItemOnline.name}
          </span>
          <IoIosLogOut onClick={logOut} className="logout-icon ms-auto" />
        </div>
        </nav>
      </div>

      <br />
      <div className="marquee-container">
        <div className="marquee-content">
          {adImages.map((image, index) => (
            <img style={{height:200}}
              key={index}
              src={image}
              alt={`Ad Image ${index + 1}`}
              className="marquee-image"
            />
          ))}
        </div>
      </div>

      <div className="marquee-container">
        <div className="carousel">
          <button className="prev-button" onClick={handlePrevAd}>
            &lt;
          </button>
          <img style={{position:"relative",width:1000 , height:250}}
            src={adImages[currentAdIndex]}
            alt={`Ad Image ${currentAdIndex + 1}`}
            className="carousel-image"
          />
          <button className="next-button" onClick={handleNextAd}>
            &gt;
          </button>
        </div>
      </div>

      {/* Category Management */}
      <div className="category-management">
        <h3 style={{fontFamily:'initial', display:'flex' , marginLeft:550}}>Quản lý danh mục</h3>
        <div className="categories">
          <button
            className={`btn btn-outline-primary ${
              selectedCategory === "all" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("all")}
          >
            Tất cả
          </button>
          <button
            className={`btn btn-outline-primary ${
              selectedCategory === "Xe tay ga" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Xe tay ga")}
          >
            Xe tay ga
          </button>
          <button
            className={`btn btn-outline-primary ${
              selectedCategory === "Xe côn tay" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Xe côn tay")}
          >
            Xe côn tay
          </button>
          <button
            className={`btn btn-outline-primary ${
              selectedCategory === "Xe số" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Xe số")}
          >
            Xe số
          </button>
          <button
            className={`btn btn-outline-primary ${
              selectedCategory === "Xe phân khối lớn" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Xe phân khối lớn")}
          >
            Xe phân khối lớn
          </button>
          <button
            className={`btn btn-outline-primary ${
              selectedCategory === "Xe máy điện" ? "active" : ""
            }`}
            onClick={() => handleCategoryChange("Xe máy điện")}
          >
            Xe máy điện
          </button>
          
        </div>
      </div>

      <div className="main-content">
        <div className="product-list">
          {currentProducts
            .filter((el: any) => {
              if (
                selectedCategory == "all" ||
                el.category == selectedCategory
              ) {
                return true;
              }
              return false;
            })
            .map((product: any) => (
              <div className="product-item" key={product.id}>
                <Link to="/home/detail" onClick={() => toDetail(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                  />
                </Link>
                <h3>{product.name}</h3>
                <p className="price">Giá : {product.price} VNĐ</p>
                <p>
                  <b>Động cơ </b> : {product.type}
                </p>
                <p>
                  <b>Loại Xe </b> : {product.state}
                </p>
                <p>
                  <b>Số lượng</b> : {product.quantity}
                </p>
                <p>
                  <b>Danh mục</b> : {product.category}
                </p>
                <button className="btn btn-primary mb-2 me-2">
                  <Link
                    to="/index/detail"
                    onClick={() => toDetail(product)}
                    className="text-white text-decoration-none"
                  >
                    Xem thông tin chi tiết
                  </Link>
                </button>
                <button
                  type="button"
                  className="btn btn-success mb-2 me-2"
                  onClick={() => addToCard(product)}
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="btn btn-warning mb-2">Mua ngay</button>
              </div>
            ))}
        </div>

        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-outline-secondary pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="text-center p-4 bg-body-tertiary text-muted">
        {/* Social media links */}
        <div className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi qua mạng xã hội:</span>
          </div>
          <div>
            <a href="#" className="me-4 text-reset">
              <FaFacebook />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaTwitter />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaGoogle />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaInstagram />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaLinkedin />
            </a>
            <a href="#" className="me-4 text-reset">
              <FaGithub />
            </a>
          </div>
        </div>
        {/* Contact information */}
        <section className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">
              <FaGem className="me-3" />
              Duy Anh motobike store
            </h6>
            <p>
              Công ty chúng tôi luôn mang đến những sản phẩm chất lượng mang
              đến cho mọi người những trải nghiệm tốt nhất và đảm bảo tuyệt đối
              về sự an toàn khi mua qua app của chúng tôi
            </p>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
            <p>
              <Link to="#!" className="text-reset">
                Góc
              </Link>
            </p>
            <p>
              <Link to="#!" className="text-reset">
                Phản ứng
              </Link>
            </p>
            <p>
              <Link to="#!" className="text-reset">
                Uỷ ban
              </Link>
            </p>
            <p>
              <Link to="#!" className="text-reset">
                Larawel
              </Link>
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Liên kết hữu ích</h6>
            <p>
              <Link to="#!" className="text-reset">
                Giá cả
              </Link>
            </p>
            <p>
              <Link to="#!" className="text-reset">
                Cài đặt
              </Link>
            </p>
            <p>
              <Link to="#!" className="text-reset">
                Thứ tự
              </Link>
            </p>
            <p>
              <Link to="#!" className="text-reset">
                Giúp đỡ
              </Link>
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
            <p>
              <FaHome className="me-3" /> New York, NY 10012, US
            </p>
            <p>
              <FaEnvelope className="me-3" />
              DuyAnh123@example.com
            </p>
            <p>
              <FaPhone className="me-3" /> + 01 234 567 88
            </p>
            <p>
              <FaPrint className="me-3" /> + 01 234 567 89
            </p>
          </div>
        </div>
      </section>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Bản quyền:
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            DuyAnhBuistrap.com
          </a>
        </div>
      </div>
    </div>
  );
}
