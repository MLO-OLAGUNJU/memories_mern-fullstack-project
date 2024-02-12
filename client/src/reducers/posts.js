export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        posts._id === action.payload ? action.payload : post
      );

    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
