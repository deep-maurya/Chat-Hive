// src/App.jsx
import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { HomeIcon, SettingsIcon, UserIcon, FileTextIcon, Home, UserRoundSearch, Mail, Send, Logs, Inbox, BarChart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AxioGet, AxioPost } from '../../utils/AxiosUtils';
import Swal from 'sweetalert2';
import { menuItems } from './Menu';
import { Loading } from '../Utils/Loading';

export const Layout = (props) => {
  const [loading,setloading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authStatus, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout =async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          const logout = await AxioGet('logout');
        } catch (error) {
        }
        setTimeout(() => {
          navigate("/login")
        }, 100);
        Swal.fire({
          title: "Logout!",
          text: "Logout Successfull",
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  const isActive = (path) => `${window.location.pathname}` === path;
  const items = menuItems['user'] || [];

  useEffect(() => {
    const checkAuth = async () => {
      //console.log("kk")
      const token_select = 'auth_token';
      const authToken = Cookies.get(token_select);
      //console.log(authToken)
      if (authToken) {
        try {
          const response = await AxioPost('token_verify');
          //console.log(response)
          setAuthUser(response.data.user);
          console.log(response.data.user)
          setAuth(true);
        } catch (error) {
          console.error('Error verifying token:', error);
          setAuth(false);
          navigate('/'); 
        } finally {
          setloading(false);
        }
      } else {
        setAuth(false);
        navigate('/');
        //console.log("No auth token, redirecting to login");
      }
    };
    checkAuth();
  }, [navigate]);

  if(loading){
    return <Loading/>
  }

  return (
    <>
    {authUser && (<div className="flex h-screen overflow-hidden">
      <aside
        style={{ padding: '0px' }}
        className={`fixed inset-y-0 left-0 bg-white z-30 w-20  text-violet-600 p-4 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-20`}
      >
        <img className="p-0 py-3 self-center ml-auto mr-auto" width={'300%'} src={logo} alt="Logo" />
        <div className="flex flex-col content-between">
        <nav className="flex flex-1 flex-col items-center space-y-6 py-5">
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Home size={24} />
          </a>
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <UserRoundSearch size={24} />
          </a>
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Mail size={24} />
          </a>
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Send size={24} />
          </a>
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Logs size={24} />
          </a>
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Inbox size={24} />
          </a>
          <a href="#" className="rounded-lg p-1.5 text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <BarChart size={24} />
          </a>
        </nav>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow p-4 flex items-center justify-between">
            {/* Toggle Button for Mobile */}
            <div className="flex">
              <button className="text-gray-800 lg:hidden" onClick={toggleSidebar}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
              <h1 className="text-xl ml-3 font-bold"></h1>
            </div>

            <div className="flex items-center space-x-4">
              {authUser && <span className="font-bold">{authUser.name}</span>}
              <button onClick={handleLogout} className={`bg-yellow-500 text-white p-2 font-bold text-medium rounded`}>
                Logout
              </button>
            </div>
          </header>
          <main className="flex-1 p-4 bg-gray-100 overflow-auto">
            {props.children}
          </main>
        </div>
      </div>
    </div>)}
    </>
  );
};
