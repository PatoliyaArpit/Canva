import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import { BsGrid1X2, BsFillImageFill, BsFolder } from "react-icons/bs";
import { FaShapes, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { RxTransparencyGrid } from "react-icons/rx";
import { MdKeyboardArrowLeft } from "react-icons/md";
import TemplateDesign from "../Components/main/TemplateDesign";
import MyImages from "../Components/MyImages";
import Projects from "../Components/Projects";
import Image from "../Components/Image";
import CreateComponent from "../Components/CreateComponent";
import api from "../utils/api";

const Main = () => {
  const { design_id } = useParams();
  const [state, setstate] = useState("");
  const [current_Component, setcurrent_Component] = useState("");
  const [rotate, setrotate] = useState(0);
  const [image, setImage] = useState("");
  const [color, setcolor] = useState("");
  const [left, setleft] = useState("");
  const [top, settop] = useState("");
  const [width, setwidth] = useState("");
  const [height, setheight] = useState("");
  const [opacity, setopacity] = useState("");
  const [zindex, setzindex] = useState("");
  const [text, settext] = useState("");

  const [padding, setpadding] = useState("");
  const [font, setfont] = useState("");
  const [weight, setweight] = useState("");
  const [radius, setradius] = useState(0);
  const [show, setshow] = useState({
    status: true,
    name: "",
  });
  const setElement = (type, name) => {
    setstate(type);
    setshow({
      state: false,
      name,
    });
  };
  const moveElement = (id, currentInfo) => {
    setcurrent_Component(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);
    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };
    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setleft(parseInt(currentDiv.style.left));
      settop(parseInt(currentDiv.style.top));
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const resizeElement = (id, currentInfo) => {
    setcurrent_Component(currentInfo);

    let isMoving = true;

    const currentDiv = document.getElementById(id);
    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };
    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setwidth(parseInt(currentDiv.style.width));
      setheight(parseInt(currentDiv.style.height));
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const rotateElement = (id, currentInfo) => {
    setcurrent_Component("");
    setcurrent_Component(currentInfo);
    const target = document.getElementById(id);
    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(target);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      if (movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    };
    const mouseUp = (e) => {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
      const getStyle = window.getComputedStyle(target);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      setrotate(deg);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };
  // const remove_background = () => {
  //   const com = Components.find((c) => c.id === current_Component.id);
  //   const temp = Components.filter((c) => c.id !== current_Component.id);
  //   com.image = "";
  //   setImage("");
  //   setComponents([...temp, com]);
  // };

  const [Components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      height: 450,
      width: 650,
      z_index: 1,
      color: "#fff",
      image: "",
      setcurrent_Component: (a) => setcurrent_Component(a),
    },
  ]);

  const removeComponent = (id) => {
    const temp = Components.filter((c) => c.id !== id);
    setcurrent_Component("");
    setComponents(temp);
  };

  const remove_background = () => {
    const com = Components.find((c) => c.id === current_Component.id);
    const temp = Components.filter((c) => c.id !== current_Component.id);
    com.image = "";
    setImage("");
    setComponents([...temp, com]);
  };

  const opacityHandale = (e) => {
    setopacity(parseFloat(e.target.value));
  };
  const createShape = (name, type) => {
    const style = {
      id: Components.length + 1,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setcurrent_Component: (a) => setcurrent_Component(a),
      // remove_background: () => setImage(""),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setComponents([...Components, style]);
  };

  const add_text = (name, type) => {
    const style = {
      id: Components.length + 1,
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: 22,
      title: "Add text",
      weight: 400,
      color: "#3c3c3d",
      setcurrent_Component: (a) => setcurrent_Component(a),
      // remove_background: () => setImage(""),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setweight("");
    setfont("");
    setpadding("");
    setcurrent_Component(style);
    setComponents([...Components, style]);
  };

  const add_image = (img) => {
    const style = {
      id: Components.length + 1,
      name: "image",
      type: "image",
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      radius: 0,
      image: img,
      setcurrent_Component: (a) => setcurrent_Component(a),
      // remove_background: () => setImage(""),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setcurrent_Component(style);
    setComponents([...Components, style]);
  };
  useEffect(() => {
    if (current_Component) {
      const index = Components.findIndex((c) => c.id === current_Component.id);
      const temp = Components.filter((c) => c.id !== current_Component.id);
      console.log(current_Component,"000")

      if (current_Component.name !== "text") {
        Components[index].width = width || current_Component.width;
        Components[index].height = height || current_Component.height;
        Components[index].rotate = rotate || current_Component.rotate;
      }
      if (current_Component.name === "text") {
        Components[index].font = font || current_Component.font;
        Components[index].padding = padding || current_Component.padding;
        Components[index].weight = weight || current_Component.weight;
        Components[index].title = text || current_Component.title;
      }

      if (current_Component.name === "image") {
        Components[index].radius = radius || current_Component.radius;
      }

      if (current_Component.name === "main_frame" && image) {
        Components[index].image = image || current_Component.image;
      }

      Components[index].color = color || current_Component.color;

      if (current_Component.name !== "main_frame") {
        Components[index].left = left || current_Component.left;
        Components[index].top = top || current_Component.top;
        Components[index].opacity = opacity || current_Component.opacity;
        Components[index].z_index = zindex || current_Component.z_index;
      }

      setComponents([...temp, Components[index]]);

      setcolor("");
      setwidth("");
      setheight("");
      settop("");
      setleft("");
      setrotate(0);
      setopacity("");
      setzindex("");
      settext("");
      // setradius("")
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    rotate,
    opacity,
    zindex,
    padding,
    font,
    weight,
    text,
    radius,
  ]);

  useEffect(() => {
    const get_design = async () => {
      try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        const { design } = data;

        for (let i = 0; i < design.length; i++) {
          design[i].setcurrent_Component = (a) => setcurrent_Component(a);
          design[i].moveElement = moveElement;
          design[i].resizeElement = resizeElement;
          design[i].rotateElement = rotateElement;
          design[i].remove_background = remove_background;
        }

        setComponents(design);
      } catch (error) {
        console.log(error);
      }
    };
    get_design();
  }, [design_id]);
  return (
    <div className="min-w-screen h-screen bg-black">
      <Header components={Components} design_id={design_id} />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto">
          <div
            onClick={() => setElement("design", "design")}
            className={`${
              show.name === "design" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className=" text-2xl">
              <BsGrid1X2 />
            </span>
            <span className=" text-xl font-medium">Design</span>
          </div>

          <div
            onClick={() => setElement("shapes", "shapes")}
            className={`${
              show.name === "shapes" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>

          <div
            onClick={() => setElement("image", "uploadImage")}
            className={`${
              show.name === "uploadImage" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FaCloudUploadAlt />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>

          <div
            onClick={() => setElement("text", "text")}
            className={`${
              show.name === "text" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <TfiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>

          <div
            onClick={() => setElement("project", "projects")}
            className={`${
              show.name === "projects" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFolder />
            </span>
            <span className="text-xs font-medium">Project</span>
          </div>

          <div
            onClick={() => setElement("initImage", "images")}
            className={`${
              show.name === "images" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <BsFillImageFill />
            </span>
            <span className="text-xs font-medium">Images</span>
          </div>

          <div
            onClick={() => setElement("background", "background")}
            className={`${
              show.name === "background" ? " bg-[#252627]" : ""
            } w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <RxTransparencyGrid />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
        </div>
        <div className=" h-full w-[calc(100%-75px)]">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}
          >
            <div
              onClick={() => setshow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>
            {state === "design" && (
              <div>
                <div className=" grid grid-cols-2 gap-2">
                  <TemplateDesign />
                </div>
              </div>
            )}
            {state === "shapes" && (
              <div className="grid grid-cols-3 gap-3">
                <div
                  onClick={() => createShape("shape", "rect")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                ></div>
              </div>
            )}
            {state === "image" && <MyImages />}
            {state === "text" && (
              <div>
                <div className=" grid grid-cols-1 gap-2">
                  <div
                    onClick={() => add_text("text", "title")}
                    className=" bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                  >
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}
            {state === "project" && <Projects />}
            {state === "initImage" && (
              <div className="h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
                <Image add_image={add_image} />
              </div>
            )}
            {state === "background" && (
              <div className="h-[80vh] overflow-x-auto flex  justify-start items-start scrollbar-hide">
                <div className=" grid grid-cols-2 gap-2">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 45, 78, 23, 65, 54, 87, 98,
                  ].map((img, i) => (
                    <div
                      onClick={() =>
                        setImage("http://localhost:5173/Arpit.jpg")
                      }
                      key={i}
                      className=" w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
                    >
                      <img
                        className=" w-[150px] h-[150px] object-fill"
                        src={`http://localhost:5173/Arpit.jpg`}
                        alt="image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className=" w-full flex h-full">
            <div
              className={` flex justify-center relative items-center h-full ${
                !current_Component
                  ? "w-full"
                  : " w-[calc(100%-250px)] overflow-hidden"
              }`}
            >
              <div className=" m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
                <div
                  id="main_design"
                  className=" w-auto relative h-auto overflow-hidden"
                >
                  {Components.map((c, i) => (
                    <CreateComponent
                      key={i}
                      info={c}
                      current_Component={current_Component}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>
            {current_Component && (
              <div className=" h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2 ">
                <div className=" flex gap-6 flex-col items-start h-full px-3 justify-start ">
                  <div className=" flex gap-4 justify-center items-start mt-4 ">
                    <span>Color:</span>
                    <label
                      className=" w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: `${
                          current_Component.color &&
                          current_Component.color !== "#ff"
                            ? current_Component.color
                            : " gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setcolor(e.target.value)}
                      type="color"
                      className=" invisible"
                      id="color"
                    />
                  </div>
                  {current_Component.name === "main_frame" && image && (
                    <div>
                      <button
                        className=" p-[6px] bg-slate-700 text-white rounded-md"
                        onClick={remove_background}
                      >
                        Remove background
                      </button>
                    </div>
                  )}
                  {current_Component.name !== "main_frame" && (
                    <div className=" flex gap-6 flex-col">
                      <div className=" flex gap-1 justify-start items-start">
                        <span className=" text-md w-[70px]">Opacity:</span>
                        <input
                          onChange={opacityHandale}
                          className=" w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={current_Component.opacity}
                        />
                      </div>
                      <div className=" flex gap-1 justify-start items-start">
                        <span className=" text-md w-[70px]">Z-Index:</span>
                        <input
                          onChange={(e) => setzindex(parseInt(e.target.value))}
                          className=" w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={current_Component.z_index}
                        />
                      </div>
                      {current_Component.name === "image" && (
                        <div className=" flex gap-1 justify-start items-start">
                          <span className=" text-md w-[70px]">Radius:</span>
                          <input
                            onChange={(e) =>
                              setradius(parseInt(e.target.value))
                            }
                            className=" w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            type="number"
                            step={1}
                            value={current_Component.radius}
                          />
                        </div>
                      )}
                      {current_Component.name === "text" && (
                        <>
                          <div className=" flex gap-1 justify-start items-start">
                            <span className=" text-md w-[70px]">Padding:</span>
                            <input
                              onChange={(e) =>
                                setpadding(parseInt(e.target.value))
                              }
                              className=" w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_Component.padding}
                            />
                          </div>
                          <div className=" flex gap-1 justify-start items-start">
                            <span className=" text-md w-[72px]">
                              Font Size :
                            </span>
                            <input
                              onChange={(e) =>
                                setfont(parseInt(e.target.value))
                              }
                              className=" w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_Component.font}
                            />
                          </div>
                          <div className=" flex gap-1 justify-start items-start">
                            <span className=" text-md w-[72px]">Weight :</span>
                            <input
                              onChange={(e) =>
                                setweight(parseInt(e.target.value))
                              }
                              className=" w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={current_Component.weight}
                            />
                          </div>
                          <div className=" flex gap-1 flex-col  justify-start items-start">
                            <input
                              onChange={(e) =>
                                setcurrent_Component({
                                  ...current_Component,
                                  title: e.target.value,
                                })
                              }
                              className="  border border-gray-700 bg-transparent outline-none p-2 rounded-md"
                              type="text"
                              value={current_Component.title}
                            />
                            <button
                              onClick={() => {
                                settext(current_Component.title);
                              }}
                              className=" px-4 py-2 bg-purple-500 text-xs text-white rounded-sm"
                            >
                              Add
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
