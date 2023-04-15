import React from 'react';
import Big from 'big.js';
import { PageTemplate, ReviewPageTemplate } from '../common/styles';
import Header from '../common/Header/Header';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router';
import useAddProductReviewHooks from './addProductReviewHooks';
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



export const AddProductReviewPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  
  const { user } = UserAuth()
  
  const {         
      rating, setRating,
      reviewDescription, selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls,
      isAnonymous, setIsAnonymous, enlargedImg, setEnlargedImg, isEnlarged, setIsEnlarged,
      setLoading, showReviewCompleteToast, setShowReviewCompleteToast, characterCount, maxCharacters,
      location, searchParams, productId, orderId, orderTitle, dateOfOrder, ratingLabels,
      getRatingLabelText, handleReviewDescriptionChange, handleFileChange, handleRemove, handleEnlarged,
      handleShrink, handleCheckboxChange, handleSubmit
  } = useAddProductReviewHooks(state)

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

  const ProductImage = {
    width: "100px",
    height: "100px",
    marginRight: "10px"
  }

  return (
    <PageTemplate>
      {/* the navigation bar */}
      {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}

      {/* show the product that going to review*/}
      <ShowProductBeingReviewed>
        <ShowProduct>
          <ShowOrderTitle> {dateOfOrder!= null && dateOfOrder.split("T")[0]} </ShowOrderTitle>
          <ShowOrderTitle> {orderTitle} </ShowOrderTitle>
        </ShowProduct>
      </ShowProductBeingReviewed>
    
      <FormDiv>
        <FormStyle onSubmit={handleSubmit}>

          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* for user to click the number of stars */}
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
          {/* the textbox for review description */}
          <label>
            Review Description: <br />
            <textarea placeholder="Share more thoughts on the product to help other buyers" 
            onChange={handleReviewDescriptionChange}
            style={{ maxWidth:"800px", minWidth:"500px", maxHeight:"500px",minHeight:"150px" }}
            value={reviewDescription} maxLength="999" />
          </label>
          {/* show the count of characters type in the textbox */}
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
          {/* only can upload up to 5 and if there is 5 the upload image button will disappear */}
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
          {/* submit button */}
          <button class="sc-ckEbSK dVcYVY btn btn-primary" type="submit">Submit</button>
        </FormStyle> 
      </FormDiv>
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
const ShowProductBeingReviewed = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e6fa;
  padding: 10px;
`
const ShowProduct = style.div`
  text-align: center;
`

const ShowOrderTitle = style.p`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`
const FormDiv = style.div`
`
const FormStyle = style.Form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
