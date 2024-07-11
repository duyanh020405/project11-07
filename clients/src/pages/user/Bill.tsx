import React from 'react'

export default function Bill() {
    const ItemOnline = JSON.parse(localStorage.getItem("userOnl") || "{}");
    const item = JSON.parse(localStorage.getItem("detail") || "{}");
  

     const handleBuyNow = () => {
    alert(`Mua ngay sản phẩm ${item.name}`);
  };
  return (
    <div>
      
    </div>
  )
}
