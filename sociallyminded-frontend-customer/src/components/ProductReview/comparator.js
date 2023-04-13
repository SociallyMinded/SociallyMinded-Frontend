
import React from "react";


export function reviewDateComparator(r1, r2) {
    // if (Date.parse(r1.dateOfReview) < Date.parse(r2.dateOfReview)) {
    //     return -1;
    // }
    // else if (Date.parse(r1.dateOfReview) > Date.parse(r2.dateOfReview)) {
    //     return 1;
    // } 
    // else {
    //     return 0;
    // }
    const date1 = new Date(r1.dateOfReview);
    const date2 = new Date(r2.dateOfReview);
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
}





    