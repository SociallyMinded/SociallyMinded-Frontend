
import React from "react";

export function orderTitleComparator(ord1, ord2) {
    if (ord1.orderTitle < ord2.orderTitle) {
        return -1;
    }
    else if (ord1.orderTitle > ord2.orderTitle) {
        return 1;
    } 
    else {
        return 0;
    }
}

export function qtyComparator(ord1, ord2) {
    if (parseFloat(ord1.quantity) < parseFloat(ord2.quantity)) {
        return -1;
    }
    else if (parseFloat(ord1.quantity) > parseFloat(ord2.quantity)) {
        return 1;
    } 
    else {
        return 0;
    }
}

export function priceComparator(ord1, ord2) {
    if (parseFloat(ord1.totalPrice) < parseFloat(ord2.totalPrice)) {
        return -1;
    }
    else if (parseFloat(ord1.totalPrice) > parseFloat(ord2.totalPrice)) {
        return 1;
    } 
    else {
        return 0;
    }
}

export function orderDateComparator(ord1, ord2) {
    if (Date.parse(ord1.dateOfOrder) < Date.parse(ord2.dateOfOrder)) {
        return -1;
    }
    else if (Date.parse(ord1.dateOfOrder) > Date.parse(ord2.dateOfOrder)) {
        return 1;
    } 
    else {
        return 0;
    }
}

export function orderAddressComparator(ord1, ord2) {
    if (ord1.address < ord2.address) {
        return -1;
    }
    else if (ord1.address > ord2.address) {
        return 1;
    } 
    else {
        return 0;
    }
}

export function orderStatusComparator(ord1, ord2) {
    if (ord1.orderStatus < ord2.orderStatus) {
        return -1;
    }
    else if (ord1.orderStatus > ord2.orderStatus) {
        return 1;
    } 
    else {
        return 0;
    }
}




    