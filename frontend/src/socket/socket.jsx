import {io} from 'socket.io-client';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWMwMDAzYjU3ZWUzNGMzNTlkNzgzYiIsImVtYWlsIjoic3VqYW53YUBnbWFpbC5jb20iLCJpYXQiOjE3MzkzNDMyNzAsImV4cCI6MTczOTM0Njg3MH0.0aVweUdOPN5kH3Ipr8-LUP8EpVJX3PDKYPe8ecFL86g"
const socket = io("http://localhost:3000/private", {auth: {token: token}})
export default socket;