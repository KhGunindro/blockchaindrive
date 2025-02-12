import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // Generate the table rows with images
      const imageRows = str_array.map((item, i) => {
        return (
          <tr key={i}>
            <td>
              <a href={item} target="_blank" rel="noopener noreferrer">
                <img
                  src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                  alt="new"
                  className="image-list"
                />
              </a>
            </td>
            <td>
              <a href={item} target="_blank" rel="noopener noreferrer">
                {item}
              </a>
            </td>
          </tr>
        );
      });
      setData(imageRows);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="table-container">
        <button className="center button" onClick={getdata}>
          Get Data
        </button>
        <input
          type="text"
          placeholder="Enter Address"
          className="address"
        ></input>

        {/* Table to display images */}
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
      </div>
    </>
  );
};

export default Display;