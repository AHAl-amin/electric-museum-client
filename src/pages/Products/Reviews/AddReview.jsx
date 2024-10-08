// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import ReactStars from "react-rating-stars-component";
// import useAuth from '../../../hooks/useAuth';
// import LoginModel from '../../User/Login/LoginModel';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import ReviewCard from './ReviewCard';

// const AddReview = ({ product, loadRating }) => {
//   const { user } = useAuth();
//   const { _id } = product;
//   // ---------------- review start ---------------------

//   const [reviews, setReviews] = useState([]);
//   const [myReviews, setMyReviews] = useState([]);

//   const loadReview = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_VERCEL_API}/reviews/${_id}`);
//       // console.log('reviews', response.data);
//       setReviews(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadMyReview = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_VERCEL_API}/myReviews?email=${user?.email}&productId=${_id}`);
//       // console.log('myReviews', response.data);
//       setMyReviews(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     loadReview();
//     loadMyReview();
//   }, [user]);

//   const [reviewRating, setReviewRating] = useState(0);
//   const [ratingMsg, setRatingMsg] = useState('');
//   const ratingChanged = (newRating) => {
//     setReviewRating(newRating);
//     setRatingMsg('');
//   };

//   const handleAddReview = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       document.getElementById('login_modal').showModal();
//     }

//     if (reviewRating < 1) {
//       return setRatingMsg('Please kindly provide a rating.');
//     } else {
//       setRatingMsg('');
//     }

//     const form = e.target;
//     const comment = form.comment.value;
//     const reviewDate = form.reviewDate.value;

//     const completeReview = {
//       reviewerImage: user.photoURL,
//       reviewerName: user.displayName,
//       reviewerEmail: user.email,
//       reviewDate,
//       rating: parseInt(reviewRating),
//       comment,
//       productId: _id
//     };

//     console.log(completeReview);
//     // --------- send server start ----- 
//     await axios.post(`${import.meta.env.VITE_VERCEL_API}/reviews`, completeReview)
//       .then(function (response) {
//         console.log(response.data);
//         if (response.data.acknowledged) {
//           toast.success('Thanks for Review!');
//           loadReview();
//           loadMyReview();
//           loadRating();
//           form.reset();
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     // --------- send server end -----
//   };
//   // ---------------- review end ---------------------

//   return (
//     <div>
//       {
//         myReviews.length > 0 ?
//           <div className='w-full md:w-3/5 lg:w-1/2 mx-auto'>
//             <h3 className="font-bold text-lg text-center mb-2">My Review</h3>
//             <div className="grid grid-cols-1 gap-5">
//               <label className="flex flex-col gap-1 w-full">
//                 <p>{myReviews[0].comment}</p>
//               </label>
//               <label className="flex gap-1 w-full items-center">
//                 <span className="font-semibold">Rating: </span>
//                 <ReactStars
//                   count={5}
//                   value={myReviews[0].rating} // Set the fixed rating value here
//                   size={24}
//                   edit={false} // Disable editing
//                   emptyIcon={<i className="far fa-star"></i>}
//                   halfIcon={<i className="fa fa-star-half-alt"></i>}
//                   fullIcon={<i className="fa fa-star"></i>}
//                   activeColor="#ffd700"
//                 />
//               </label>
//               <label>
//                 <span className="font-semibold">Review Date: </span>
//                 <span>{myReviews[0].reviewDate}</span>
//               </label>
//             </div>
//           </div>
//           :
//           <div>
//             <h3 className="font-bold text-lg text-center">Review</h3>
//             <form
//               onSubmit={handleAddReview}
//               className="flex flex-col gap-5 w-full md:w-3/5 lg:w-1/2 mx-auto">
//               <div className="grid grid-cols-1 gap-5">
//                 <label className="flex flex-col gap-1 w-full">
//                   <span>Comment</span>
//                   <textarea name="comment" placeholder="Write your review here" className="textarea textarea-bordered h-24 w-full" required ></textarea>
//                 </label>
//                 <label className="flex gap-1 w-full items-center">
//                   <span>Rating: </span>
//                   <ReactStars
//                     count={5}
//                     onChange={ratingChanged}
//                     size={24}
//                     emptyIcon={<i className="far fa-star"></i>}
//                     halfIcon={<i className="fa fa-star-half-alt"></i>}
//                     fullIcon={<i className="fa fa-star"></i>}
//                     activeColor="#ffd700"
//                   />
//                 </label>
//                 {ratingMsg && <p className="text-red-500">{ratingMsg}</p>}
//                 <label className="flex flex-col gap-1 w-full">
//                   <span>Review Date</span>
//                   <input type="date" name="reviewDate" value={new Date().toISOString().substring(0, 10)} className="input input-bordered w-full" required />
//                 </label>
//               </div>
//               <div className="gap-5">
//                 <label className="flex flex-col gap-1 w-full">
//                   <input type="submit" value="Submit" className="btn bg-secondary text-secondary-content w-full" />
//                 </label>
//               </div>
//             </form>
//           </div>
//       }
//       {/* ------- Login Form Start ---------- */}
//       {/* You can open the modal using document.getElementById('ID').showModal() method */}
//       <dialog id="login_modal" className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             {/* if there is a button in form, it will close the modal */}
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//           </form>
//           <LoginModel></LoginModel>
//         </div>
//       </dialog>
//       {/* ------- Login Form End ---------- */}
//       <hr className="my-2" />
//       {/* ---------- review section start --------- */}
//       <div>
//         {
//           reviews.length > 0 &&
//           <ReviewCard
//             reviews={reviews.sort(function () { return 0.5 - Math.random() }).slice(0, 6)}
//           ></ReviewCard>
//         }
//       </div>
//       {/* ---------- review section end --------- */}
//     </div>
//   );
// };


// AddReview.propTypes = {
//   product: PropTypes.object.isRequired,
//   loadRating: PropTypes.func
// };

// export default AddReview;