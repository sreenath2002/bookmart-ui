import React, { useState } from 'react';
import { useEffect } from 'react';
import './Coupontable.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar';

import { getCouponsList, addNewCoupon, updateCoupon } from '../../axios/service/adminServices';
const Coupontable = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [couponsList, setCouponsList] = useState([]);
    const [showtable, setShowTable] = useState(false)
    const [couponCode, setCouponCode] = useState();
    const [couponStartDate, setCouponStartDate] = useState();
    const [couponEndDate, setCouponEndDate] = useState();
    const [couponDiscount, setCouponDiscount] = useState();
    const jwtToken = localStorage.getItem("jwt");
    const [refresh, setRefresh] = useState(false)

    const[couponIdError,setCouponIdError]=useState();
    const[validDateError,setValidDateError]=useState();
    const[expDateError,setExpError]=useState();
    const[discountError,setDiscountError]=useState();
    const[responseSuucesmg,setReponseSucccesMsg]=useState();
    const[responseFalidMsg,setResponseFalidMsg]=useState();
    useEffect(() => {
        fetchData(jwtToken);

        async function fetchData(token) {
            try {
                const allCoupons = await getCouponsList(token);

                // Ensure 'id' is defined or passed correctly

                if (allCoupons.statuscode === '200 OK' && allCoupons.message === "Coupons retrieved successfully") {

                    setCouponsList(allCoupons.result)
                    setShowTable(true);
                    // Update state after receiving user data




                } else {
                    setShowTable(false)
                }

            } catch (error) {
                setShowTable(false)
            }
        }
    }, [!refresh]);
    const validateForm = () => {
        let isValid = true;
    
        // Email validation using regex
    
        if (couponCode.trim() === '') {
            couponIdError("Please provide Coupon Code")
          isValid = false;
        }
        if (couponStartDate.trim() == '') {
            setValidDateError("Please Provide date")
          isValid = false;
        }
    
    
    
        return isValid;
      };



    const handleUpdate = (couponId) => {
        setShowTable(false)
        setShowUpdateForm(true);
        console.log(`Updating coupon with ID ${couponId}`);
    };

    const handleAddNewCoupon = () => {
        setShowTable(false)
        setShowAddForm(true);
        console.log('Adding a new coupon');
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
        setShowTable(true)
    };

    const handleCloseAddForm = () => {

        setShowAddForm(false);
        setShowTable(true)
    };
    const handleUpdateSubmit = () => {
        setShowUpdateForm(false);
    };
    const handleAddSubmit = () => {
        setShowAddForm(false);
    };

    return (
        <div>
            <AdminNavbar />


            {showtable && (<>
                <button className='addcouponbtn' onClick={handleAddNewCoupon}>Add New Coupon</button>

                <table>
                    <thead>
                        <tr>
                            <th>Coupon Code</th>
                            <th>Valid From Date</th>
                            <th>Valid Upto Date</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {couponsList.length > 0 ? (
                            couponsList.map(coupon => (
                                <tr key={coupon.id}>
                                    <td>{coupon.code}</td>
                                    <td>{coupon.valid_fromDate.split('T')[0]}</td>
                                    <td>{coupon.valid_uptoDate.split('T')[0]}</td>
                                    <td>{coupon.discount}</td>
                                    <td style={{ color: coupon.is_activeState ? 'green' : 'red' }}>
                                        {coupon.is_activeState ? 'Active' : 'Expired'}
                                    </td>
                                    <td>
                                        {coupon.is_activeState && (
                                            <button className='updatecouponbtn' onClick={() => handleUpdate(coupon.id)}>Update</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : couponsList.length ==0 ?(
                            <tr>
                                <td colSpan="6" >No Coupons</td>
                            </tr>
                        ) : (<tr>
                            <td colSpan="6"className='coupontableserverError' >Internal Server Error</td>
                        </tr>) }

                    </tbody>
                </table>
            </>) }

            {/* Update Coupon Form */}
            {showUpdateForm && (
                <div className="modalupdatecoupon">
                    <div className="modalupdatecoupon-content">
                        <span className="close" onClick={handleCloseUpdateForm}>&times;</span>
                        <h2>Update Coupon</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            {responseFalidMsg && <span className='couponerr'>Internal Server Error</span>}
                            {responseSuucesmg && <span className='updatecouponsucces'>Coupon Updated SuccesFully</span>}
                            <label htmlFor="couponId">Coupon ID:</label>
                            <input type="text" id="couponId" name="couponId" onChange={(e) => { setCouponCode(e.target.value) }} required />
                             {couponIdError && <span className='couponerr'>{couponIdError}</span>}
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" id="startDate" name="startDate" onChange={(e) => { setCouponStartDate(e.target.value) }} required />
                            {validDateError && <span className='couponerr'>{validDateError}</span>}
                            <label htmlFor="endDate">End Date:</label>
                            <input type="date" id="endDate" name="endDate" onChange={(e) => { setCouponEndDate(e.target.value) }} required />
                             {expDateError && <span className='couponerr'>{expDateError}</span>}
                            <label htmlFor="discount">Discount:</label>
                            <input type="number" id="discount" name="discount" onChange={(e) => { setCouponDiscount(e.target.value) }} required />
                            {discountError && <span className='couponerr'>{discountError}</span>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Coupon Form */}
            {showAddForm && (
                <div className="modaladdcoupon">
                    <div className="modaladdcoupon-content">
                        <span className="close" onClick={handleCloseAddForm}>&times;</span>
                        <h2>Add Coupon</h2>
                        <form onSubmit={handleAddSubmit}>
                        {responseFalidMsg && <span className='couponerr'>Internal Server Error</span>}
                            {responseSuucesmg && <span className='updatecouponsucces'>Coupon Updated SuccesFully</span>}
                            <label htmlFor="couponId">Coupon ID:</label>
                            <input type="text" id="couponId" name="couponId" onChange={(e) => { setCouponCode(e.target.value) }} required />
                            {couponIdError && <span className='couponerr'>{couponIdError}</span>}
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" id="startDate" name="startDate" onChange={(e) => { setCouponStartDate(e.target.value) }} required />
                            {validDateError && <span className='couponerr'>{validDateError}</span>}
                            <label htmlFor="endDate">End Date:</label>
                            <input type="date" id="endDate" name="endDate" onChange={(e) => { setCouponEndDate(e.target.value) }} required />
                            {expDateError && <span className='couponerr'>{expDateError}</span>}
                            <label htmlFor="discount">Discount:</label>
                            <input type="number" id="discount" name="discount" onChange={(e) => { setCouponEndDate(e.target.value) }} required />
                            {discountError && <span className='couponerr'>{discountError}</span>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Coupontable;
