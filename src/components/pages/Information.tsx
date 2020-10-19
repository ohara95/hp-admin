import React from "react";

const Information = () => (
  <div className="w-10/12 h-full my-0 mx-auto sm:w-6/12 ">
    <div
      style={{
        height: "90%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        lineHeight: 2,
      }}
    >
      <h2 className="itemLineWhite">店舗情報</h2>
      <p>18時～24時営業（火曜定休）</p>
      <p>
        <i className="fas fa-phone-alt" />
        0263-88-2667
      </p>
      <p>〒390-1701</p>
      <p>松本市梓川倭84番地3</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12871.991073171917!2d137.87687523194418!3d36.2395481810841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d12524c870001%3A0x95d13a987f13bf65!2z5Lqu5piMKO-9ve-9ue--j--9uyk!5e0!3m2!1sja!2sjp!4v1598400093670!5m2!1sja!2sjp"
        style={{
          width: "100%",
          height: "60%",
          marginTop: 20,
        }}
      />
    </div>
  </div>
);

export default Information;
