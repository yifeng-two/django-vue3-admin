/*
 * @Author: yifeng
 * @Date: 2022-07-17 17:01:45
 * @LastEditors: yifeng
 * @LastEditTime: 2022-08-24 21:46:07
 * @Description: 
 */
// appfront/src/api/index.js
// import Vue from 'vue'

import axiosInstance from './axiosInstance'

const axios = axiosInstance

export const getImages = () => {
    return axios.get(`/api/showImage`)
}

// export const postBook = (bookName, bookPrice) => { return axios.post(`http://localhost:8000/api/bookstore/books/`, { 'title': bookName, 'price': bookPrice }) }
