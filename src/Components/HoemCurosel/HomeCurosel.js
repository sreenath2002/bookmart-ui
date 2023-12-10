import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './HomeCurosel.css'; // Import your CSS file


const HomeCurosel = () => {
  return (
    <div className='maindiv-nav'>
    
      <div className='carosel-main'>
    
        <Carousel >
          {/* Book 1 */}
          <Carousel.Item>
            <div className='book-details'>
              <img
                className='book-image'
                src='Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg'
                alt='Book 1'
              />
              <div className='book-info'>
              <h3>Transactions</h3>
                <p>Author: Author Name</p>
                <p>Description: Book description goes here.</p>
                <Button variant='primary'>Show Now</Button>
              </div>
            </div>
          </Carousel.Item>

          {/* Book 2 */}
          <Carousel.Item>
            <div className='book-details'>
              <img
                className='book-image'
                src='Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg'
                alt='Book 2'
              />
              <div className='book-info'>
              <h3>Transactions</h3>
                <p>Author: Author Name</p>
                <p>Description: Book description goes here.</p>
                <Button variant='primary'>Show Now</Button>
              </div>
            </div>
          </Carousel.Item>

          {/* Book 3 */}
          <Carousel.Item>
            <div className='book-details'>
              <img
                className='book-image'
                src='Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg'
                alt='Book 3'
              />
              <div className='book-info'>
                <h3>Transactions</h3>
                <p>Author: Author Name</p>
                <p>Description: Book description goes here.</p>
                <Button variant='primary'>Show Now</Button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default HomeCurosel;

 




















































//     <div id="carouselExampleIndicators" class="carousel slide mt-xxl" data-bs-ride="carousel">
//   <div class="carousel-indicators">
   
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
//   </div>
//   <div class="carousel-inner ">
  
//     <div class="carousel-item active">
//       <div class="row align-items-center">
//         <div class="col-md-6">
//           <div class="carousel-content">
//             <h5>First slide label</h5>
//             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//           </div>
//         </div>
//         <div class="col-md-6">
//           <img src="Images/51JDhCpkycL._AC_UF1000,1000_QL80_.jpg" class="d-block w-100" alt="First slide"/>
//         </div>
//       </div>
//     </div>

//     <div class="carousel-item">
//       <div class="row align-items-center">
//         <div class="col-md-6">
//           <div class="carousel-content">
//             <h5>Second slide label</h5>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           </div>
//         </div>
//         <div class="col-md-6">
//           <img src="Images/51VCsjmphbL._AC_UF894,1000_QL80_.jpg" class="d-block w-100" alt="Second slide"/>
//         </div>
//       </div>
//     </div>
 
//     <div class="carousel-item">
//       <div class="row align-items-center">
//         <div class="col-md-6">
//           <div class="carousel-content">
//             <h5>Third slide label</h5>
//             <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//           </div>
//         </div>
//         <div class="col-md-6">
//           <img src="Images/51VCsjmphbL._AC_UF894,1000_QL80_.jpg" class="d-block w-100" alt="Third slide"/>
//         </div>
//       </div>
//     </div>
//   </div>
 
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next bg-light" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>
//   )

// };

// export default HomeCurosel;

