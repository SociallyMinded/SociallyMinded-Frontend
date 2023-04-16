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
import { getOrderByIdUrl, updateOrderUrl } from "../../routes/routes";

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
    const [loading, setLoading] = useState(false);
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
    
    const navigate = useNavigate();
    const { user } = UserAuth();
 
    // rating labels that following the number of stars
    const ratingLabels = {
        1: 'Terrible',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    //get the rating label for the different stars selected accordingly
    function getRatingLabelText(rating) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${ratingLabels[rating]}`;
    };

    //count the number of characters type into the textbox by the user
    const handleReviewDescriptionChange = (e) => {
        setReviewDescription(e.target.value);
    };

    //upload file
    const handleFileChange = (event) => {
        const files = event.target.files;
        let urls = [];
        let images = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, file]);
            urls.push(URL.createObjectURL(file));
        }
        //set the fie to preview also
        setPreviewUrls((prevPreviewUrls) => [...prevPreviewUrls, ...urls]);
    };

    //remove the image from the selectfile and preview also
    const handleRemove = (index) => {
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);

        const newPreviewUrls = [...previewUrls];
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);

    };

    //enlarge image
    const handleEnlarged = (img) => {
        setEnlargedImg(img);
        setIsEnlarged(true);
    };

    //shrink image
    const handleShrink = () => {
        setEnlargedImg(-1);
        setIsEnlarged(false);
    };

    //checkout to see if want show username at the review or not 
    function handleCheckboxChange(e) {
        setIsAnonymous(e.target.checked);
    }

    
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

    //submit function
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
                        "numRatings" : product.numRatings == undefined ? Big(1) : Big(product.numRatings).plus(1),
                        "ratingScore" : product.ratingScore == undefined ? Big(rating)  : Big(product.ratingScore).plus(rating) ,
                        "productId" : productId,
                        "isActive": true
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
        product, setProduct, order, setOrder, rating, setRating, reviewDescription, setReviewDescription,
        selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls, isAnonymous, setIsAnonymous,
        enlargedImg, setEnlargedImg, isEnlarged, setIsEnlarged, error, setError, loading, setLoading,
        showReviewCompleteToast, setShowReviewCompleteToast, characterCount, maxCharacters, location,
        searchParams, productId, orderId, orderTitle, productImageLink, dateOfOrder, ratingLabels,
        getRatingLabelText, handleReviewDescriptionChange, handleFileChange, handleRemove, handleEnlarged,
        handleShrink, handleCheckboxChange, handleSubmit
    } 
}

export default useAddProductReviewHooks