import {io} from 'socket.io-client';
import Cookies from 'js-cookie';
const token = Cookies.get('uid');
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWMwMDAzYjU3ZWUzNGMzNTlkNzgzYiIsImVtYWlsIjoic3VqYW53YUBnbWFpbC5jb20iLCJpYXQiOjE3MzkzNTEwNzgsImV4cCI6MTczOTM1NDY3OH0.GLTpbaDQ8K7kVN_PK--vt8rQLoxINhIqmow7vy6uyTc"
const socket = io("https://type-fast-backend.onrender.com/private", {auth: {token: token}})
export default socket;