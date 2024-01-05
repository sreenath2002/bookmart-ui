import React, { useState } from 'react';
import './StockmanagementTable.css';
import { getProducts, getAllStoks, addStock, updateStock } from '../../axios/service/adminServices';
import { useEffect } from 'react';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
const StockmanagementTable = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [bookName, setBookName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [succesmessage, setSuccesMessage] = useState();
  const [stockErrorMessage, setStockErrorMEssage] = useState();
  const [books, setBooks] = useState([]);
  const [productBooks, setProductBooks] = useState([]);
  const [stocks, setStokcs] = useState([])
  const [mainTable, setMainTable] = useState(true);
  const [upadteStokeId, setUpdateStokeId] = useState();
  const [updateBookId, setUpdateBookId] = useState();
  const [updateTotalStock, setUpdateTotalStock] = useState(0);
  const [updateStockLeft, setStockLeft] = useState(0);
  const [m, setm] = useState(0)
  const [updateQuantity, setUpdateQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState();
  const [bookError, setBookError] = useState();
  const [selectedBookname, setSelectedBookname] = useState();
  const jwtToken = localStorage.getItem("jwt");
  const [refresh,setRefresh]=useState(false)
  useEffect(() => {
    fetchData(jwtToken);

    async function fetchData(token) {
      try {
        const productData = await getProducts(token);
        const stocksData = await getAllStoks(token)
        // Ensure 'id' is defined or passed correctly

        if (productData.statuscode === '200 OK' && stocksData.statuscode === '200 OK') {

          setStokcs(stocksData.result)
          // Update state after receiving user data
          setProductBooks(productData.result)



        } else {
          console.log("Failed to fetch product data");
        }

      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  }, [!refresh]);

  const handleAddClick = () => {
    setShowAddForm(true);
    setMainTable(false);
    setShowUpdateForm(false);
  };
  const validateForm = () => {
    let isValid = true;

    // Email validation using regex

    if (quantity.trim() === '') {
      setQuantityError("Please provide Quantity")
      isValid = false;
    }
    if (selectedBookname.trim() == '') {
      setBookError("Please Provide Book Name")
      isValid = false;
    }



    return isValid;
  };
  const validateForm2 = () => {
    let isValid = true;

    // Email validation using regex

    if (updateQuantity.trim() === '') {
      setQuantityError("Please provide Quantity")
      isValid = false;
    }




    return isValid;
  };



  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setQuantityError(false)
        const productDetails = {
          productId: selectedBookname,
          qtyLeft: quantity,
          qtyTotal: quantity
        }
        console.log("productDetails===", productDetails)
        const addDetails = await addStock(jwtToken, productDetails)
        console.log("lsdhgck")
        console.log("addDetails", addDetails)

        if (addDetails.statuscode === '201 CREATED') {

          setSuccesMessage(true)
          setTimeout(() => {
            setSuccesMessage(false)
          }, 2000)
        } else {
          setStockErrorMEssage(true);
          setTimeout(() => {
            setStockErrorMEssage(false)
          }, 2000)
        }
      }


      catch (err) {
        setStockErrorMEssage(true);
        setTimeout(() => {
          setStockErrorMEssage(false)
        }, 2000)
      }
    }
    else {

    }

  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm2()) {

      setQuantityError(false)
      try {
        
        const banlance = parseInt(updateStockLeft) + parseInt(updateQuantity);
        console.log(banlance);

        const stock = parseInt(updateTotalStock) + parseInt(updateQuantity);

        console.log(stock)
        const updatestockDetails = {
          qtyLeft: banlance,
          qtyTotal: stock,

        }

        console.log("productDetails===", updatestockDetails)
        const updateDetails = await updateStock(jwtToken, upadteStokeId, updatestockDetails)
        console.log("lsdhgck")
        console.log("addDetails", updateDetails)

        if (updateDetails.statuscode === '200 OK') {

          setSuccesMessage(true)
          setTimeout(() => {
            setSuccesMessage(false)
          }, 2000)
        } else {
          setStockErrorMEssage(true);
          setTimeout(() => {
            setStockErrorMEssage(false)
          }, 2000)
        }
      }


      catch (err) {
        setStockErrorMEssage(true);
        setTimeout(() => {
          setStockErrorMEssage(false)
        }, 2000)
      }
    }
  };
  const handleUpdateClick = (id, totalqty, leftqty) => {
    setUpdateStokeId(id);
    setUpdateTotalStock(totalqty);
    setStockLeft(leftqty)
    setShowUpdateForm(true);
    setShowAddForm(false);
    setMainTable(false);

  }
  const handleCloseStockUpdateForm=()=>{
 setShowUpdateForm(false)
 setMainTable(true)
  }
  const handleCloseStockAddForm=()=>{
    setShowAddForm(false)
    setMainTable(true)
     }

  return (
    <div className="stocktables-container">
      <AdminNavbar />
      {/* Main Table */}
      {mainTable ? (
        <div className="stocktable-container">
         <div className="button-container">
            <button onClick={handleAddClick}>Add</button>

          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Stock ID</th>
                <th>Book Name</th>
                <th>Total Quantity</th>
                <th>Quantity Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            {stocks ?
              (<tbody>

                {stocks.map((stock) => (
                  <tr key={stock.id}>
                    <th>{stock.id}</th>
                    <td>{stock.product.title}</td>
                    <td>{stock.total}</td>
                    <td>{stock.left}</td>
                    <td><button onClick={() => handleUpdateClick(stock.id, stock.total, stock.left)}>Update</button></td>
                  </tr>
                ))}
              </tbody>) : <div>No Stocks Added</div>}
          </table>
          
        </div>
      ) : null}

      {/* Add Form */}
      {showAddForm && (
        <div className="addstocktable-container">
          {succesmessage && <p className='stokaddsucces'>New Stock added</p>}


          {stockErrorMessage && <p className='stokaddfaild'>Internal Server Error</p>}
          <span className="closestockupdateform" onClick={() =>handleCloseStockAddForm()}>&times;</span>
          <h2>Add Stock</h2>
          <form onSubmit={handleAddFormSubmit}>
            <div>
              <label htmlFor="category">Select Book</label>
              <select id="book" name="selectedBookname" value={selectedBookname} onChange={(e) => setSelectedBookname(e.target.value)} required>
                <option value="">Select book</option>
                {productBooks.map(productBook => (
                  <option key={productBook.id} value={productBook.id}>
                    {productBook.title}
                  </option>
                ))}
              </select>
              {bookError && <p className='stokaddfaild'>{bookError}</p>}
            </div>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {quantityError && <p className='stokaddfaild'>{quantityError}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Update Form */}
      {showUpdateForm && (
        <div className="updatestocktable-container">
          {succesmessage && <p className='stokaddsucces'>Stock Updated</p>}
          {stockErrorMessage && <p className='stokaddfaild'>Internal Server Error</p>}
          <span className="closestockupdateform" onClick={() => handleCloseStockUpdateForm()}>&times;</span>
          <h2>Update Stock</h2>
          <form onSubmit={handleUpdateFormSubmit}>

            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                id="updateQuantity"

                onChange={(e) => setUpdateQuantity(e.target.value)}
              />
              {bookError && <p className='stokaddfaild'>{bookError}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StockmanagementTable;

