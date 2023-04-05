import React from 'react';
import Big from 'big.js';
import { PageTemplate, ReviewPageTemplate } from '../common/styles';
import Header from '../common/Header/Header';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router';
// import useProductReviewHooks from './addProductReviewHooks';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllReviewsByProductIdUrl } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { AiFillCamera } from 'react-icons/ai';
import { ImEnlarge2 } from 'react-icons/im';
import { PROFILE_PAGE_LINK } from "../../routes/routes";
import { createNewReviewUrl } from "../../routes/routes";
import { getProductByIdUrl } from "../../routes/routes";
import { updateProductUrl } from "../../routes/routes";
import { getOrderByIdUrl } from "../../routes/routes";
//import { uploadReviewImages } from "../../routes/reviewUploadImageRoutes"
import LoggedInHeader from "../common/Header/LoggedInHeader";



export const AddProductReviewPage = (state) => {
    const [product, setProduct] = useState(null);
    const [order, setOrder] = useState(null);
    const [rating, setRating] = React.useState(5);
    const [hover, setHover] = React.useState(-1);
    const [reviewDescription, setReviewDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [enlargedImg, setEnlargedImg] = useState(-1);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showReviewCompleteToast, setShowReviewCompleteToast] = useState(true);
    const characterCount = reviewDescription.length;
    const maxCharacters = 999;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    const orderId = searchParams.get('orderId');
    const orderTitle = searchParams.get('orderTitle');
    const productImageLink = searchParams.get('productImageLink');
    const dateOfOrder = searchParams.get('dateOfOrder');
    
    //const { state } = useLocation()
    const navigate = useNavigate();
    const { user } = UserAuth();
    console.log(user.uid);
    console.log("state"+productId);

    const ratingLabels = {
        1: 'Terrible',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
      };

    function getRatingLabelText(rating) {
    return `${rating} Star${rating !== 1 ? 's' : ''}, ${ratingLabels[rating]}`;
    };

    const handleReviewDescriptionChange = (e) => {
        setReviewDescription(e.target.value);
        //onChange={(e) => setReviewDescription(e.target.value)}
      };

      const handleFileChange = (event) => {
        console.log("productImake link :" +productImageLink);
        const files = event.target.files;
        let urls = [];
        let images = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
          urls.push(URL.createObjectURL(file));
        }
        
        setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
      
         console.log("url of the preview images : " + urls);
      };

      const handleRemove = (index) => {
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);
    
        const newPreviewUrls = [...previewUrls];
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);

      };

      const handleEnlarged = (img) => {
        setEnlargedImg(img);
        setIsEnlarged(true);
      };
    
      const handleShrink = () => {
        setEnlargedImg(-1);
        setIsEnlarged(false);
      };

      function handleCheckboxChange(e) {
        setIsAnonymous(e.target.checked);
      }

    
    useEffect(() => {
      setLoading(true);
      axios.get(getProductByIdUrl + productId)
      .then(response => {
        
          setProduct(response.data)
          console.log("product : " + response.data)
          return axios.get(getOrderByIdUrl + orderId);
      })
      .then(response => {
        setOrder(response.data); // set the order state variable here
        console.log("order : " + response.data);
      })
      .catch ((error) => {
          setError(error)
      })
      .finally (
          setLoading(false)
      )
  }, []);

    const handleSubmit = async (e) => {
      if (user != null) {
        setLoading(true);
        const base64Promises = [];
        const productId = product.productId
        const customerFirebaseUid = user.uid
        e.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 10);
        const imagePromises = selectedFiles.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
          });
        });
        Promise.all(imagePromises).then((imageBase64s) => {
        const newReview = {
          "productId" :productId,
          "custFirebaseUid": customerFirebaseUid,
          "review": {
          "reviewDescription" : reviewDescription,
          "rating" : rating,
          "isAnonymous" : isAnonymous,
          "reviewImages" : imageBase64s
        }
          };
         
          const updateProduct = {
            "socialEnterpriseId" : product.socialenterprise.socialEnterpriseId,
            "product": {
            "category" : product.category,
            "description" : product.description,
            "imageLink": product.imageLink,
            "name" : product.name,
            "price" : product.price,
            "numRatings" : Big(product.numRatings).plus(1),
            "ratingScore" : Big(product.ratingScore).plus(rating),
            "productId" : productId
          }
            };

          //update the product review number and rating
          axios.put(updateProductUrl + product.productId, updateProduct)
          .then(response => {
            console.log("enter this product method")
            console.log(response.data)
          }).catch((error) => {
            console.log(error); // handle any errors that occur during the axios call
          });
          //create review
          axios.post(createNewReviewUrl, newReview)
            .then(response => {
              console.log("enter")
              console.log(response.data)
            })
            .then((response) => {
              console.log(response)
              setLoading(false)
              setShowReviewCompleteToast(true)
              const url = `${PROFILE_PAGE_LINK}?showReviewCompleteToast=${showReviewCompleteToast}`;
              navigate(url)
            })
            .catch((error) => {
              console.log(error); // handle any errors that occur during the axios call
            });

        });

         
        setSelectedFiles([]);
         
      };
     

    };

    // css
    const formStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    }

    const reviewUploadImage = {
        background: "#fff",
        border: "1px solid #8351cf",
        boxSizing: "border-box",
        padding: "0 12px",
        height: "30px",
        color: "#8351cf",
        display: "inline-flex",
        marginRight: "8px",
        cursor: "pointer"
    };

    const reviewUploadImageButton = {
        display: "none"
    }

    const removeButton = {
        background: "#fff",
        border: "1px solid #8351cf",
        boxSizing: "border-box",
        padding: "0 12px",
        height: "30px",
        color: "#8351cf",
        display: "inline-flex",
        cursor: "pointer",
        position: "absolute",
        right: "0"
    }

    const enlargeButton = {
        background: "#fff",
        border: "1px solid #8351cf",
        boxSizing: "border-box",
        padding: "4 8px",
        height: "30px",
        color: "#8351cf",
        display: "inline-flex",
        cursor: "pointer",
        position: "absolute",
        left: "0"
    }
    
    const ShowProductBeingReviewed = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#e6e6fa",
      padding: "10px"
  }

  const ProductImage = {
    width: "100px",
    height: "100px",
    marginRight: "10px"
}

const ShowOrderTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0"
}

    return (
      <PageTemplate>
         {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
       {/* show the product that going to review*/}
       <div style={ShowProductBeingReviewed}>
       {/* <img
          src={}
         alt= "pic"
                            /> */}
        {/* <img style={ProductImage} variant="top" src={`${productImageLink[0]}`} />
        <img style={ProductImage} variant="top" src={`${productImageLink}`} /> */}
        {/* <img style={ProductImage} variant="top" src={require('./donut.png')} /> */}
        <div style={{ textAlign: 'center' }}>
        <p style={ShowOrderTitle}> {dateOfOrder!= null && dateOfOrder.split("T")[0]} </p>
       
        <p style={ShowOrderTitle}>{orderTitle} </p>
        </div>
        {/* <p> Product name : {product.name} </p> */}
        
       </div>
        <div>
        <form style={formStyle} onSubmit={handleSubmit}>
        
        <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating}
        precision={1}
        getLabelText={getRatingLabelText}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{ratingLabels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>

        <br />
        <label>
          Review Description: <br />
          <textarea placeholder="Share more thoughts on the product to help other buyers" 
          onChange={handleReviewDescriptionChange}
          style={{ maxWidth:"800px", minWidth:"500px", maxHeight:"500px",minHeight:"150px" }}
          value={reviewDescription} maxLength="999" />
        </label>
        <div>
        characters: {characterCount}/{maxCharacters}
      </div>

        {/* preview of the image*/}
        <div style={{display:"flex"}}>
        
       {previewUrls.map((url, index) => (
            <div style={{backgroundImage: `url(${url})`, border: "none", 
            maxWidth:"80px", minWidth:"80px", maxHeight:"80px",minHeight:"80px",
            backgroundSize:"cover", position:"relative",overflow:"hidden",
            marginRight:"6px",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat"}} >

              {/* button to remove the picture uploaded */}
                <button style={removeButton} type="button" onClick={() => handleRemove(index)}>
                    X
                </button>
                {/* button to enlarge the picture uploaded */}
                <button style={enlargeButton} type="button" onClick={() => handleEnlarged(index)}>
                <ImEnlarge2/>
                </button>
            </div>
     
         
          
        // </div>
      ))}
      {/* show the enlarged picture */}
      {enlargedImg !== -1 && (
        <div onClick={handleShrink}>
          <img src={previewUrls[enlargedImg]} style={{ cursor: "zoom-out", maxWidth:"100%", maxHeight:"100%", position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', zIndex: 100 }} alt="Enlarged" />
        </div>
      )}
      {/* the background when the picture is being enlarged */}
       {isEnlarged && (
          <div
            style={{position: 'fixed',top: 0,left: 0,right: 0,bottom: 0, backgroundColor: 'rgba(172, 127, 172, 0.5)',zIndex: 99}}
            onClick={handleShrink}>
          </div>
        )}
      </div>
      <br />
      <br />
      {selectedFiles.length < 5 && (
        <>
         {/* upload image button */}
        <label class= "imageButton" style={reviewUploadImage} >
        <p><AiFillCamera/></p>
            <span>add photo</span>
          <input id="uploadReviewImage" style={reviewUploadImageButton} type="file" onChange={handleFileChange} /> 
         </label>
        </>
      )}
        <br />
        <br />
        {/* checkbox to check if the user want to show review as anonymous */}
        <label>
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={handleCheckboxChange}
        />
        Do not show my username in the review.
      </label>
      <br/>
      <br/>
        <button class="sc-ckEbSK dVcYVY btn btn-primary" type="submit">Submit</button>
      </form> 
      </div>
      </PageTemplate>
    );

}



const Title = styled.h1`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:1;
    font-size:4.5em;
    font-weight:semi-bold;
`





