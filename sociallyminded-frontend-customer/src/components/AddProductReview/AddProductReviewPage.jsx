import React from 'react';
import { PageTemplate, ReviewPageTemplate } from '../common/styles';
import Header from '../common/Header/Header';
import styled from 'styled-components';
import useAddProductReviewHooks from './addProductReviewHooks';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { AiFillCamera } from 'react-icons/ai';
import { ImEnlarge2 } from 'react-icons/im';
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Spinner from 'react-bootstrap/Spinner';

export const AddProductReviewPage = () => {
  const navigate = useNavigate();
  
  const { user } = UserAuth();

  const {       
    product, setProduct, order, setOrder, rating, setRating, reviewDescription, setReviewDescription,
    selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls, isAnonymous, setIsAnonymous,
    enlargedImg, setEnlargedImg, isEnlarged, setIsEnlarged, error, setError, loading, setLoading,
    showReviewCompleteToast, setShowReviewCompleteToast, characterCount, maxCharacters, location,
    searchParams, productId, orderId, orderTitle, productImageLink, dateOfOrder, ratingLabels,
    getRatingLabelText, handleReviewDescriptionChange, handleFileChange, handleRemove, handleEnlarged,
    handleShrink, handleCheckboxChange, handleSubmit
  } = useAddProductReviewHooks(state)

  // css
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    marginTop:"5%"
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
    display: "none",
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
    right: "0",
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
    marginTop:"7vh",
    marginBottom:"0vh"
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
        {/* show navigation bar */}
        {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
        
        {/* show the product that going to review*/}
        {!loading &&
          <ReviewPage>
            <div style={ShowProductBeingReviewed}>
              <h1>Review for product {product != null && product.name}</h1>
              <div style={{ textAlign: 'center' }}>
              </div>
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
                  {/* user choose the number stars */}
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
                {/* textbox with limit of 999 characters */}
                <label>
                  Review Description: <br />
                  <textarea placeholder="Share more thoughts on the product to help other buyers" 
                  onChange={handleReviewDescriptionChange}
                  style={{ maxWidth:"800px", minWidth:"500px", maxHeight:"500px",minHeight:"150px" }}
                  value={reviewDescription} maxLength="999" />
                </label>

                {/* show the number of characters being input in the textbox */}
                <div>
                  Character(s): {characterCount}/{maxCharacters}
                </div>

                {/* preview of the image*/}
                <div style={{display:"flex"}}>
                  {/* show preview of image uploaded */}
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
                {/* do not show the image button when the image uploaded reach 5 */}
                {selectedFiles.length < 5 && (
                  <PhotoContainer>
                    {/* upload image button */}
                    <label class= "imageButton" style={reviewUploadImage} >
                      <p><AiFillCamera/></p>
                      <span>add photo</span>
                      <input id="uploadReviewImage" style={reviewUploadImageButton} type="file" onChange={handleFileChange} /> 
                    </label>
                  </PhotoContainer>
                )}
                <br/>
                {/* show the number of image selected */}
                {selectedFiles.length >= 0 && (
                  <p>Image(s): {selectedFiles.length}/5</p>
                )}
                <br />
                {/* checkbox to check if the user want to show review as anonymous */}
                <UploadText>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={handleCheckboxChange}
                  />
                  Do not show my username in the review.
                </UploadText>
                <br/>
                <br/>
                <button class="sc-ckEbSK dVcYVY btn btn-primary" type="submit">Submit</button>
              </form> 
            </div>
          </ReviewPage>
        } 
        {/* show loading spinner when it is processing the submit */}
        {loading && 
          <LoadingContainer>
            <Spinner animation="grow" />
            <SpinnerText>Loading</SpinnerText>
          </LoadingContainer>
        }
      </PageTemplate>
    );

}

const ReviewPage = styled.div`
`

const Title = styled.h1`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:1;
    font-size:4.5em;
    font-weight:semi-bold;
`
const SpinnerText = styled.h5`
    margin-left:1vw;
    margin-top:1vh;
`
const LoadingContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height:50vh;
`

const PhotoContainer = styled.div`
  margin-top:5vh;
`

const UploadText = styled.p`
  margin-bottom:3vh;
`