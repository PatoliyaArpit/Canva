import React from "react";
import { Link } from "react-router-dom";
import useDownloader from "react-use-downloader";
import * as htmlToImage from "html-to-image";
import api from "../utils/api";

const Header = ({ components, design_id }) => {
  const { download } = useDownloader();
  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);
    if (image) {
      const obj = {
        design: components,
      };
      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);
      try {
        // setLoader(true);
        const { data } = await api.put(`/api/update-user-design${design_id}`, formData);
       
        // setLoader(false);
      } catch (error) {
        // setLoader(false);
        console.error(
          "Error creating design:",
          error.response || error.message
        );
      }
    }
  };
  const DownloadImage = async () => {
    const getDiv = document.getElementById("main_design");
    const dataUrl = await htmlToImage.toPng(getDiv, {
      style: {
        transform: "scale(1)",
      },
    });

    download(dataUrl, "image.png");
  };
  return (
    <div className=" h-[60px] bg-gradient-to-r from-[#212122] via-[#21282b] to-[#2a2b2c] w-full">
      <div className=" flex justify-between px-10 items-center text-gray-300 h-full">
        <Link to="/">
          <img
            src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
            alt=""
          ></img>
        </Link>
        <span className=" text-xl"> mini canva</span>
        <div className=" flex justify-center items-center gap-2 text-gray-300">
          <button
            onClick={saveImage}
            className=" px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            save
          </button>
          <button
            onClick={DownloadImage}
            className=" px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
