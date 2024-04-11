const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  });
  const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return users.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    const myPromise = new Promise ((resolve, reject) => {
      if (isbn) {resolve ( res.send(JSON.stringify(books)));}
        else{res.send({message: "error"})}
 });
});
   
// Get book details based on author)
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  const myPromise = new Promise ((resolve,reject) => {
  if (author) {resolve ( res.send(JSON.stringify(books)))}
    else{res.send({message:"error"})}
});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    const myPromise = new Promise ((resolve,reject) => {
    if (title) {resolve ( res.send(JSON.stringify(books)))}
      else{res.send({message:"error"})}
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    const myPromise = new Promise ((resolve,reject) => {
    if (isbn) {resolve ( res.send(JSON.stringify(books)))}
      else{res.send({message:"error"})}
  });
});

module.exports.general = public_users;
