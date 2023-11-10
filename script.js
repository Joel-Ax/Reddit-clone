async function fetchPosts() {
  let res = await fetch("https://dummyjson.com/posts");
  let json = await res.json();
  /*Rather than using .then as a promise I'm using an async function and
  await to make the code easier to read, they essentially do
  the same thing*/
  return json.posts;
}

function renderPosts(posts) {
  let wrapper = document.createElement("div");
  document.body.append(wrapper);

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let postContainer = document.createElement("div");

    let title = document.createElement("h3");
    title.innerText = post.title;

    let postSection = document.createElement("p");
    postSection.innerText = post.body;

    let divTags = document.createElement("div");

    //Loop to create as many span elements that is needed (depending on how many tags there is)
    //containing a tag inside the divTags element
    for (let i = 0; i < post.tags.length; i++) {
      let tag = document.createElement("span");
      tag.innerText = ` #${post.tags[i]}`;
      divTags.append(tag);
    }

    wrapper.append(postContainer);
    postContainer.append(title, postSection, divTags);
  }
}

async function loadPage() {
  let posts = await fetchPosts();
  renderPosts(posts);
}

loadPage();
