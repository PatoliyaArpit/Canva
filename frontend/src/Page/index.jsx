import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import api from "../utils/api";

const index = () => {
  const [type, settype] = useState("");
  const [show, setshow] = useState(false);
  const [loader,setloader]=useState(false)
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle=(e)=>{
    setstate({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const user_register =async(e)=>{
    e.preventDefault()
    try{
      setloader(true)
      const {data}=await api.post('/api/user-register',state)
      setloader(false)
      // localStorage.setItem('Canva_token',data.token)
      setstate({
        name: "",
        email: "",
        password: "",
      })
      window.location.href='/'
      console.log(data)

    }catch(error){
      setloader(false)
      console.log(error.response)

    }

  }
  const user_login =async(e)=>{
    e.preventDefault()
    try{
      setloader(true)
      const {data}=await api.post('/api/user-login',state)
      setloader(false)
      localStorage.setItem('Canva_token',data.token)
      setstate({
        
        email: "",
        password: "",
      })
      window.location.href='/'
      console.log(data)

    }catch(error){
      setloader(false)
      console.log(error.response)

    }

  }
  return (
    <div className=" bg-[#18181b] min-h-screen w-full">
      <div
        className={`w-screen ${
          show ? "visible opacity-100" : "invisible opacity-30"
        } transition-all duration-500 h-screen fixed bg-[#252627ad] flex justify-center items-center`}
      >
        <div className=" w-[350px] bg-[#323335] m-auto px-6 py-4 rounded-md relative">
          <div
            onClick={() => setshow(false)}
            className=" absolute right-4 top-4 text-xl cursor-pointer text-white"
          >
            <IoMdClose />
          </div>
          <h2 className=" text-white pb-4 text-center text-xl">
            Login or sign up in seconds
          </h2>
          {type === "singin" && (
            <form onSubmit={user_login}>
              <div className=" flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                onChange={inputHandle}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email enter"
                  value={state.email}
                  className=" px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className=" flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="password">password</label>
                <input
                onChange={inputHandle}
                  type="text"
                  name="password"
                  id="password"
                  placeholder="password enter"
                  value={state.password}
                  className=" px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
              <button disabled={loader} className=" px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white">
                  {loader?"Loading..":"Signin"}
                </button>
              </div>
              <div className=" flex py-4 justify-between items-center px-3 ">
                <div className=" w-[45%] h-[1px] bg-[#434449]"></div>
                <div className="w-[6%] text-center flex pb-1 pl-1 text-white">
                  or
                </div>
                <div className=" w-[45%] h-[1px] bg-[#434449]"></div>
              </div>
              <div className=" pb-4">
                <button className="px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800">
                  <span>
                    <AiOutlineGoogle />
                  </span>
                  <span>Login With gmail</span>
                </button>
              </div>
              <div className=" pb-4">
                <button className="px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-700 w-full text-white outline-none hover:bg-blue-800">
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login With facebook</span>
                </button>
              </div>
            </form>
          )}
          {type === "signup" && (
            <form onSubmit={user_register}>
              <div className=" flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="name">Name</label>
                <input
                onChange={inputHandle}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name enter"
                  value={state.name}
                  required
                  className=" px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className=" flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="email">Email</label>
                <input
                onChange={inputHandle}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email enter"
                  value={state.email}
                  required
                  className=" px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div className=" flex flex-col gap-3 mb-3 text-white">
                <label htmlFor="password">password</label>
                <input
                onChange={inputHandle}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password enter"
                  value={state.password}
                  required
                  className=" px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
                />
              </div>
              <div>
                <button disabled={loader} className=" px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white">
                  {loader?"Loading..":"Sign up"}
                </button>
              </div>
              <div className=" flex py-4 justify-between items-center px-3 ">
                <div className=" w-[45%] h-[1px] bg-[#434449]"></div>
                <div className="w-[6%] text-center flex pb-1 pl-1 text-white">
                  or
                </div>
                <div className=" w-[45%] h-[1px] bg-[#434449]"></div>
              </div>
              <div className=" pb-4">
                <button className="px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-orange-700 w-full text-white outline-none hover:bg-orange-800">
                  <span>
                    <AiOutlineGoogle />
                  </span>
                  <span>Login With gmail</span>
                </button>
              </div>
              <div className=" pb-4">
                <button className="px-3 flex justify-center items-center gap-2 py-2 rounded-md bg-blue-700 w-full text-white outline-none hover:bg-blue-800">
                  <span>
                    <FaFacebookF />
                  </span>
                  <span>Login With facebook</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className=" bg-[#252627] shadow-md">
        <div className=" w-[93%] m-auto py-3">
          <div className=" flex justify-between items-center">
            <div className=" w-[80px] h-[48px]">
              <img
                className=" w-full h-full"
                src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
              ></img>
            </div>
            <div className=" flex gap-4">
              <button
                onClick={() =>{
                    setshow(true)
                    settype("singin")
                }}
                className=" py-2 w-[80px] text-center bg-blue-500 text-white transition-all hover:bg-blue-600 rounded-[5px] font-medium"
              >
                Signin
              </button>
              <button onClick={()=>{
                settype("signup")
                setshow(true)
              }} className="py-2 w-[100px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full h-full justify-center items-center p-4">
        <div className=" py-[168px] flex justify-center items-center flex-col gap-6">
          <h2 className=" text-5xl text-[#c7c5c5] font-bold">
            What will you design today?
          </h2>
          <span className=" text-[#aca9a9] text-2xl font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
            voluptatibus!
          </span>
          <button onClick={()=>{
                settype("signup")
                setshow(true)
              }}  className=" py-2 w-[200px] text-center bg-purple-500 text-white transition-all hover:bg-purple-600 rounded-[5px] font-medium">
            Signup for free
          </button>
        </div>
      </div>
    </div>
  );
};
export default index;
