import React from 'react';
import Big from 'big.js';
import { useLocation } from 'react-router';
import useAddProductReviewHooks from './addProductReviewHooks';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../context/AuthContext';
import { PROFILE_PAGE_LINK } from "../../routes/routes";
import { createNewReviewUrl } from "../../routes/routes";
import { getProductByIdUrl } from "../../routes/routes";
import { updateProductUrl } from "../../routes/routes";
import { getOrderByIdUrl } from "../../routes/routes";


const useAddProductReviewHooks = (state) => {
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
    //const productImageLink = searchParams.get('productImageLink');
    const dateOfOrder = searchParams.get('dateOfOrder');
    
   
    const navigate = useNavigate();
    const { user } = UserAuth();
   
    //rating lables 1 star is terrible, ...., 5 star is excellent
    const ratingLabels = {
        1: 'Terrible',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };
    
    //if the user click on 1 star it will get the rating label accordingly
    function getRatingLabelText(rating) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${ratingLabels[rating]}`;
    };

    //counting the number of character in the text box
    const handleReviewDescriptionChange = (e) => {
        setReviewDescription(e.target.value);    
    };

    //the add image
    const handleFileChange = (event) => {
        const files = event.target.files;
        let urls = [];
        let images = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
            urls.push(URL.createObjectURL(file));
        }
        setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
    };

    //remove the image
    const handleRemove = (index) => {
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);
        
        //remove the image from the preview
        const newPreviewUrls = [...previewUrls];
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);

    };

    //enlarge the selected image
    const handleEnlarged = (img) => {
        setEnlargedImg(img);
        setIsEnlarged(true);
    };
        
    //shrink the enlarged image
    const handleShrink = () => {
        setEnlargedImg(-1);
        setIsEnlarged(false);
    };

    //check box handle if the user want to be anonymous or not
    function handleCheckboxChange(e) {
        setIsAnonymous(e.target.checked);
    };

    
    useEffect(() => {
        setLoading(true);
        axios.get(getProductByIdUrl + productId)
        .then(response => {
            setProduct(response.data)
            return axios.get(getOrderByIdUrl + orderId);
        })
        .then(response => {
        setOrder(response.data); // set the order state variable here
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, []);

    //submit function, to create the review
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
                    console.log(response.data)
                }).catch((error) => {
                    console.log(error); // handle any errors that occur during the axios call
                });

                //create review
                axios.post(createNewReviewUrl, newReview)
                .then(response => {
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

    return { 
        rating, setRating,
        reviewDescription, selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls,
        isAnonymous, setIsAnonymous, enlargedImg, setEnlargedImg, isEnlarged, setIsEnlarged,
        setLoading, showReviewCompleteToast, setShowReviewCompleteToast, characterCount, maxCharacters,
        location, searchParams, productId, orderId, orderTitle, dateOfOrder, ratingLabels,
        getRatingLabelText, handleReviewDescriptionChange, handleFileChange, handleRemove, handleEnlarged,
        handleShrink, handleCheckboxChange, handleSubmit
    } 

}

export default useAddProductReviewHooks