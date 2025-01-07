import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Upload from './artifacts/contracts/Upload.sol/Upload.json';
import { Web3Provider } from "@ethersproject/providers"; // Optional, but not used directly

import './App.css';

function App() {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

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

                const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
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

    return (
        <div>
            <h1>Wallet Connection</h1>
            {account ? (
                <p>Connected as: {account}</p>
            ) : (
                <p>Please connect your MetaMask wallet.</p>
            )}
        </div>
    );
}

export default App;
