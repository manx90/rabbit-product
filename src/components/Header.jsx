import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge, { badgeClasses } from "@mui/material/Badge";
import styled from "styled-components";
import SideBar from "@/components/SideBar";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import SearchBox from "./searchBox";
import Darkmode from "./Darkmode"

export default function Header() {
  const [Menubar, setMenubar] = useState(false);
  return (
    <div className="bg-white flex flex-col">
      <div className="flex align-center justify-between  p-[16px] lg:px-[240px] py-[24px] border-b border-[#D9D9D9]">
        <div className="flex items-center justify-center gap-[12px]">
          <Link to="/Desk">
            <IconButtonWithBadge />
          </Link>
          <SearchBox />
          <svg
            className="align-center lg:hidden"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1920_6078"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1920_6078)">
              <path
                d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                fill="#535353"
              />
            </g>
          </svg>
        </div>
        <Link to="/">
          <img src="/mainlogo.png" alt="Rabbit Products Logo" className="lg:mr-20 lg:w-42" />
        </Link>
        <div className="flex items-center justify-center gap-[12px]">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_1920_6083"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1920_6083)">
              <path
                d="M10.5 4C11.745 4 12.915 4.23625 14.01 4.70875C15.105 5.18125 16.0575 5.8225 16.8675 6.6325C17.6775 7.4425 18.3188 8.395 18.7913 9.49C19.2638 10.585 19.5 11.755 19.5 13C19.5 14.245 19.2638 15.415 18.7913 16.51C18.3188 17.605 17.6775 18.5575 16.8675 19.3675C16.0575 20.1775 15.105 20.8187 14.01 21.2912C12.915 21.7638 11.745 22 10.5 22C9.705 22 8.92875 21.8988 8.17125 21.6962C7.41375 21.4937 6.69 21.19 6 20.785C7.395 19.975 8.49375 18.88 9.29625 17.5C10.0988 16.12 10.5 14.62 10.5 13C10.5 11.38 10.0988 9.88 9.29625 8.5C8.49375 7.12 7.395 6.025 6 5.215C6.69 4.81 7.41375 4.50625 8.17125 4.30375C8.92875 4.10125 9.705 4 10.5 4Z"
                fill="#535353"
              />
            </g>
          </svg> */}
          <Darkmode/>
          {!Menubar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => setMenubar(!Menubar)}
              className="lg:hidden"
            >
              <mask
                id="mask0_1920_6087"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1920_6087)">
                <path
                  d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                  fill="#535353"
                />
              </g>
            </svg>
          ) : (
            <CloseIcon onClick={() => setMenubar(!Menubar)} />
          )}
        </div>
      </div>
      <SideBar Menubar={Menubar} />
    </div>
  );
}

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;
function IconButtonWithBadge() {
  const { totalQty } = useCart();
  return (
    <IconButton className="top-[2px]">
      <ShoppingCartIcon fontSize="medium" />
      <CartBadge badgeContent={totalQty} color="primary" overlap="circular" />
    </IconButton>
  );
}
