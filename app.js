

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const _ = require('lodash');

const homeStartingContent = "Go to /compose route to compose new blog";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.connect("mongodb+srv://aranandraj02:raj-anand@cluster0.odmbdit.mongodb.net/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);




const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
  Post.find({}).then((posts)=>{
    res.render('home', {homeStartingContent: homeStartingContent, posts: posts});
  })
  
  
  
})

app.get("/about", (req, res)=>{
  res.render('about',{aboutContent: aboutContent})
})
app.get("/contact", (req, res)=>{
  res.render('contact',{contactContent: contactContent})
})
app.post("/compose", (req, res)=>{
  
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const post = new Post({
    title: postTitle,
    content: postBody
  })
  post.save().then(()=>{
    res.redirect("/");
  });
  
  
  
})
app.get("/compose", (req, res)=>{
  res.render('compose')
})

app.get('/posts/:postId', (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}).then((post)=>{
   
    res.render('post',{
      title: post.title,
      content: post.content
    })
  });
  
  
  
});








app.listen(port, () => console.log(`app listening on port ${port}!`));
