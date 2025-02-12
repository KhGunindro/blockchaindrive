import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import { Web3Provider } from "@ethersproject/providers";
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import ethlogo from "./assets/ethlogo.svg";
import { FaShare } from "react-icons/fa";
import './App.css';

function App() {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const wallet = async () => {
            if (!window.ethereum) {
                alert("MetaMask is required to use this application.");
                return;
            }

            const provider = new Web3Provider(window.ethereum); // Initializing a connection to the Ethereum blockchain using the ethers.js
            try {
                await provider.send("eth_requestAccounts", []); // Sends a request to the Ethereum provider (window.ethereum) to prompt the user to grant the application access to their Ethereum accounts.
                const signer = provider.getSigner(); // The getSigner() method returns a Signer object, which represents the user's Ethereum account.
                const address = await signer.getAddress(); // Retrieves the Ethereum address of the account currently associated with the Signer.

                setAccount(address);

                const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
                const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
                setContract(contract);
                setProvider(provider);
            } catch (error) {
                if (error.code === -32002) {
                    alert("MetaMask request is already pending. Please wait.");
                } else {
                    console.error("Error connecting to MetaMask:", error);
                }
            }
        };

        wallet();
    }, []);
    const connectWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } else {
        alert("MetaMask is not installed.");
      }
    };

    return (
        <div>
          <div className="share-container">
        {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          <FaShare /> Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}</div>
        <Navbar account={account} connectWallet={connectWallet} />
        <div>
            <img src={ethlogo} alt="Logo" className="logo" /><h1>BlockBox</h1>
            {account ? (
                <p>Connected as: {account}</p>
            ) : (
                <p>Please connect your MetaMask wallet.</p>
            )}
        </div>
        <FileUpload account={account} contract={contract} />
        <Display account={account} contract={contract} provider={provider} />
        </div>
    );
}

export default App;
