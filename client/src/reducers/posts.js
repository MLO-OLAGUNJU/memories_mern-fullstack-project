export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
      break;
    case "CREATE":
      return posts;
      break;
    default:
      return posts;
      break;
  }
};
