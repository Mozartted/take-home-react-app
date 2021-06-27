// helper functions to work with lots of stuffs
import {useLocation} from "react-router-dom"
import moment from "moment"

export function insertItem(array, index, item) {
    return [
        ...array.slice(0, index),
        item,
        ...array.slice(index)
    ];
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

export function removeItem(array, index) {
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
}


export const formatCurrency = (value) => {
    const options2 = { style: 'currency', currency: 'NGN' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    return numberFormat2.format(value)
} 

export const momentInTime = (date) => {
    // updates for the next space.
    return moment(date).format("DD MMM, YYYY")
}

export const momentInTimeDate = (date) => {
    return moment(date).format("DD MMM, YYYY HH:mm")
}

export const momentInThePast = (date) => {
    return moment(date).isBefore(moment(new Date()))
}

export const percentageOfSuccess = (milestones) => {
    return (milestones.filter((item) => item.disburseStatus == "CONFIRMED").length / milestones.length) * 100
}