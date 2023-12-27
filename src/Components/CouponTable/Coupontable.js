import React, { useState } from 'react';
import { useEffect } from 'react';
import './Coupontable.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar';

import { getCouponsList, addNewCoupon, updateCoupon,deleteCoupon } from '../../axios/service/adminServices';
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
    const[selectedCouponId,setSelectedCouponId]=useState();
    const[couponIdError,setCouponIdError]=useState();
    const[validDateError,setValidDateError]=useState();
    const[expDateError,setExpError]=useState();
    const[discountError,setDiscountError]=useState();
    const[responseSuucesmg,setReponseSucccesMsg]=useState();
    const[responseFalidMsg,setResponseFalidMsg]=useState();
    const[responseSuucesmg1,setReponseSucccesMsg1]=useState();
    const[responseSuucesmg2,setReponseSucccesMsg2]=useState();
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
    
      
        const couponRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/;
    
        if (couponCode.trim() === '') {
            setCouponIdError("Please provide Coupon Code");
            isValid = false;
        } else if (!couponRegex.test(couponCode)) {
            if (couponCode.length < 4) {
                setCouponIdError("Coupon Code must be at least 4 characters long");
            } else {
                setCouponIdError("Coupon Code must contain both alphabets and numbers");
            }
            isValid = false;
        }
    
        return isValid;
    };
    



    const handleUpdate = (couponId) => {
        setSelectedCouponId(couponId)
        setShowTable(false)
        setShowUpdateForm(true);
     
    };

    const handleAddNewCoupon = () => {
      
        setShowTable(false)
        setShowAddForm(true);
        console.log('Adding a new coupon');
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
        setRefresh(!refresh)
        setShowTable(true)
    };

    const handleCloseAddForm = () => {

        setShowAddForm(false);
        setRefresh(!refresh)
        setShowTable(true)
    };
    const handleUpdateSubmit = async(e) => {
        e.preventDefault();
        if(validateForm()){

            try{
                const updateCouponDetails={
                    code:couponCode,
                    startdate:couponStartDate,
                    exprDate:couponEndDate,
                    discountRate:couponDiscount
                }
                console.log()
                const couponupdated=await updateCoupon(jwtToken,selectedCouponId,updateCouponDetails)
                if(couponupdated.statuscode === '200 OK')
                {
                    setReponseSucccesMsg(true);
                    setTimeout(()=>{
                        setReponseSucccesMsg(false);
                    },2000);
                }
                else{
                    setResponseFalidMsg(true);
                    setTimeout(()=>{
                        setResponseFalidMsg(false);
                    },2000);
                }

            }
            catch{
                setResponseFalidMsg(true);
                setTimeout(()=>{
                    setResponseFalidMsg(false);
                },2000);

            }
        }
        
        // setShowUpdateForm(false);
    };

    const handleDelete = async(deleteId) => {
      
        

            try{
                
                console.log(deleteId)
              
                const coupondeleted=await deleteCoupon(jwtToken,deleteId)
                console.log(deleteId)
                if(coupondeleted.statuscode === '200 OK')
                {
                    setReponseSucccesMsg2(true);
                    setTimeout(()=>{
                        setReponseSucccesMsg2(false);
                    },2000);
                    setRefresh(!refresh);
                }
                else{
                    console.log("mmm")
                    setResponseFalidMsg(true);
                    setTimeout(()=>{
                        setResponseFalidMsg(false);
                    },2000);
                }

            }
            catch{
                console.log("m22")
                setResponseFalidMsg(true);
                setTimeout(()=>{
                    setResponseFalidMsg(false);
                },2000);

            }
      
        
        // setShowUpdateForm(false);
    };
    const handleAddSubmit = async(e) => {
        e.preventDefault();
        if(validateForm()){

            try{
                const addCouponDetails={
                    code:couponCode,
                    startdate:couponStartDate,
                    exprDate:couponEndDate,
                    discountRate:couponDiscount
                }
                console.log(addCouponDetails)
                const couponadded=await addNewCoupon(jwtToken,addCouponDetails)
                if(couponadded.statuscode === '201 CREATED')
                {
                    setReponseSucccesMsg1(true);
                    setTimeout(()=>{
                        setReponseSucccesMsg1(false);
                    },2000);
                }
                else{
                    console.log("09090909090909")
                    setResponseFalidMsg(true);
                    setTimeout(()=>{
                        setResponseFalidMsg(false);
                    },2000);
                }

            }
            catch{
                console.log("0")
                setResponseFalidMsg(true);
                setTimeout(()=>{
                    setResponseFalidMsg(false);
                },2000);

            }
        }
        // setShowAddForm(false);
    };

    return (
        <div>
            <AdminNavbar />


            {showtable && (<>
                <button className='addcouponbtn' onClick={handleAddNewCoupon}>Add New Coupon</button>

                <table>
                {responseFalidMsg && <span className='couponerr'>Internal Server Error</span>}
                {responseSuucesmg2 && <span className='updatecouponsucces'>Coupon Deleted SuccesFully</span>}
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
                                       
                                            <button className='deletecouponbtn' onClick={() => handleDelete(coupon.id)}>Delete</button>
                                      
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
                            <input type="text" id="couponCode" name="couponCode" onChange={(e) => { setCouponCode(e.target.value) }} required />
                             {couponIdError && <span className='couponerr'>{couponIdError}</span>}
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" id="couponStartDate" name="startDate" onChange={(e) => { setCouponStartDate(e.target.value) }} required />
                            {validDateError && <span className='couponerr'>{validDateError}</span>}
                            <label htmlFor="endDate">End Date:</label>
                            <input type="date" id="couponEndDate" name="endDate" onChange={(e) => { setCouponEndDate(e.target.value) }} required />
                             {expDateError && <span className='couponerr'>{expDateError}</span>}
                            <label htmlFor="couponDiscount">Discount:</label>
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
                            {responseSuucesmg1 && <span className='updatecouponsucces'>Coupon Added SuccesFully</span>}
                            <label htmlFor="couponId">Coupon ID:</label>
                            <input type="text" id="couponCode" name="couponId" onChange={(e) => { setCouponCode(e.target.value) }} required />
                            {couponIdError && <span className='couponerr'>{couponIdError}</span>}
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="date" id="couponStartDate" name="startDate" onChange={(e) => { setCouponStartDate(e.target.value) }} required />
                            {validDateError && <span className='couponerr'>{validDateError}</span>}
                            <label htmlFor="endDate">End Date:</label>
                            <input type="date" id="couponEndDate" name="endDate" onChange={(e) => { setCouponEndDate(e.target.value) }} required />
                            {expDateError && <span className='couponerr'>{expDateError}</span>}
                            <label htmlFor="discount">Discount:</label>
                            <input type="number" id="discount"name="discount" onChange={(e) => { setCouponDiscount(e.target.value) }} required />
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
