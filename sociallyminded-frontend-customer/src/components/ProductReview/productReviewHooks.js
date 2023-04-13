import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllProductsUrl, getAllReviewsByProductIdUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"
import { reviewDateComparator } from "./comparator"

const useProductReviewHooks = (state) => {

    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [enlargedImg, setEnlargedImg] = useState(-1);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [rating, setRating] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [visibleGoTop, setVisibleGoTop] = useState(false);
    const [ratingCount, setRatingCount] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      });
    const [selectedSort, setSelectedSort] = useState("newest");
   
    useEffect(() => {
        axios.get(getAllReviewsByProductIdUrl + state.d.productId)
        .then(response => {
            setData(response.data.sort(reviewDateComparator).reverse())
            setDisplayData(response.data)
            response.data.forEach((d) => {
                d["avatar"] = generateRandomNum()

            })
           
            
            const counts = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
              };
              //count the number of review for each rating number
              response.data.forEach((review) => {
                counts[review.rating] += 1;
              });
              //count the total amount of review
              const totalCount = response.data.length;
              counts[0] = totalCount;
              setRatingCount(counts);
           
            const totalRating = response.data.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / response.data.length;
            setRating(averageRating.toFixed(2));
            
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, []);
    
    const handleSortNewest = () => {
        const sorted = data.sort(reviewDateComparator);
        setSelectedSort("newest");
        setData(sorted);
      };
      const handleSortOldest = () => {
        const sorted = data.sort(reviewDateComparator).reverse();
        setSelectedSort("oldest");
        setData(sorted);
      };
      window.addEventListener("scroll", () => {
        setScrollPosition(window.scrollY);
        setVisibleGoTop(window.scrollY > 0);
      });
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

    //   const handleSort = (order) => {
    //     const sorted = data.sort((a, b) => {
    //       const dateA = new Date(a.dateOfReview);
    //       const dateB = new Date(b.dateOfReview);
    //       if (isNaN(dateA) || isNaN(dateB)) {
    //         console.error('Invalid date string:', dateA, dateB);
    //         return 0;
    //       }
    //       if (order === 'newest') {
    //         return dateB - dateA; // Sort in descending order (newest first)
    //       } else {
    //         return dateA - dateB; // Sort in ascending order (oldest first)
    //       }
    //     });
    //     console.log('Sorted data:', sorted);
    //     setSelectedSort(order);
    //     setData(sorted);
    //   };

    const generateRandomNum = () => {
        const MAX_NUM = 18
        const MIN_NUM =  1
        const RANDOM_NUM = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1) + MIN_NUM)
        return RANDOM_NUM;
    }

    
    const handleEnlarged = (img) => {
        setEnlargedImg(img);
        setIsEnlarged(true);
      };
    
    const handleShrink = () => {
        setEnlargedImg(-1);
        setIsEnlarged(false);
    };

    const handleFilterButtonClick = (rating) => {
        setSelectedRating(rating);
    };

    const filteredRating = selectedRating
  ? data.filter((d) => d.rating === selectedRating)
  : data;

    return { 
        data, displayData, loading, error, generateRandomNum, enlargedImg, handleEnlarged,
        handleShrink, isEnlarged, setIsEnlarged, rating, handleFilterButtonClick, selectedRating,
        setSelectedRating, filteredRating, ratingCount, handleSortNewest, handleSortOldest, setSelectedSort,
        selectedSort, scrollToTop, visibleGoTop, setVisibleGoTop
    } 
}

export default useProductReviewHooks