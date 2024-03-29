//General variables
let postBtn = document.getElementById("post-section-btn");
let postSctn = document.getElementById("post-section");
let submitBtn = document.getElementById("submit-button");
let postsWrapper = document.getElementById("posts");

let posts = [];

let localPosts = localStorage.getItem("posts");
if (localPosts !== null) {
  posts = JSON.parse(localPosts);
  renderPosts(posts);
} else {
  loadPage();
}

async function fetchPosts() {
  let res = await fetch("https://dummyjson.com/posts");
  let json = await res.json();

  storePosts(json.posts);
  return json.posts;
}
postBtn.addEventListener("click", toggleNewPost);

//Display settings for create post window
function toggleNewPost() {
  if (postSctn.style.display === "none") {
    postSctn.style.display = "block";
    postBtn.innerText = "Close";
  } else {
    postSctn.style.display = "none";
    postBtn.innerText = "Create Post";
  }
}

function storePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

//Loop to render all posts
function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    renderPost(posts[i]);
  }
}

function renderPost(post) {
  let postContainer = document.createElement("div");

  let title = document.createElement("h3");
  title.innerText = post.title;

  let postText = document.createElement("p");
  postText.innerText = post.body;

  let divTags = document.createElement("div");
  //Loop to create as many span elements that is needed (depending on how many tags there is)
  //containing a tag inside the divTags element
  for (let i = 0; i < post.tags.length; i++) {
    let tag = document.createElement("span");
    tag.innerText = ` #${post.tags[i]}`;
    divTags.append(tag);
  }
  let reactionContainer = document.createElement("div");

  let reaction = document.createElement("div");
  reaction.innerText = post.reactions;

  let reactionLikeBtn = document.createElement("button");
  reactionLikeBtn.innerText = "👍";

  let reactionDislikeBtn = document.createElement("button");
  reactionDislikeBtn.innerText = "👎";

  reactionLikeBtn.addEventListener("click", function () {
    reaction.innerText++;
    post.reactions++;
    storePosts(posts);
  });

  reactionDislikeBtn.addEventListener("click", function () {
    reaction.innerText--;
    post.reactions--;
    storePosts(posts);
  });

  postsWrapper.prepend(postContainer);
  postContainer.append(title, postText, divTags, reactionContainer);
  reactionContainer.append(reaction, reactionLikeBtn, reactionDislikeBtn);
}

function reactionLike() {}

async function loadPage() {
  let posts = await fetchPosts();
  renderPosts(posts);
}

//Function for user posts
function submitPost(event) {
  event.preventDefault();
  let postTitleInput = document.getElementById("title");
  let postTagsInput = document.getElementById("tags");
  let postTextInput = document.getElementById("text");
  let userPost = {
    title: postTitleInput.value,
    tags: postTagsInput.value.trim().split(" "),
    body: postTextInput.value,
    reactions: 0,
  };

  posts.push(userPost);
  storePosts(posts);

  renderPost(userPost);
  postSctn.reset();
  toggleNewPost();
}

postSctn.addEventListener("submit", submitPost);
