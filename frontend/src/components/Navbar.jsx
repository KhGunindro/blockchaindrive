import React from "react";
import "./Navbar.css";
import ethlogo from "../assets/ethlogo.svg";

const Navbar = ({ account, connectWallet }) => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
      <div className="navbar__logo-container">
        <img src={ethlogo} alt="Logo" className="logo" />
        <div className="navbar__logo">Blockbox</div>
        <ul className="navbar__links">
          <li><a href="./components/About">About</a></li>
        </ul>
      </div>
        <div className="navbar__wallet">
          {account ? (
            <span className="navbar__address">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button className="navbar__button" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;