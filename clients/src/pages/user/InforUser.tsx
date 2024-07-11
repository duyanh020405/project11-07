import React from 'react'

export default function InforUser() {
    const ItemOnline = JSON.parse(localStorage.getItem("userOnl") || "{}");
    console.log(ItemOnline);
  return (
    <div >
      <div>

      </div>
      <img style={{width:100 , border:50}} src="https://th.bing.com/th/id/R.c11b6f38dffc24a4508217513b0e50bd?rik=Pt%2bkITlukiMkWg&riu=http%3a%2f%2fwww.emmegi.co.uk%2fwp-content%2fuploads%2f2019%2f01%2fUser-Icon.jpg&ehk=zjS04fF4nxx%2bpkvRPsSezyic3Z7Yfu%2fuoT75KnbNv1Y%3d&risl=&pid=ImgRaw&r=0" alt="" />
      <p>name : {ItemOnline.name}</p>
    </div>
  )
}
