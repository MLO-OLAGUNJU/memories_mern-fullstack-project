import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";

import useStyles from "./styles";

const Post = ({ post }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.Card}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div>
          {/* <Typography variant="h6">{post.creator}</Typography> */}
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"  onClick={()=>{} }
          >
            <MdMoreHoriz fontSize="default" />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <CardContent>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => {}}>
            <FaRegThumbsUp fontSize="small" />
            Like
            {post.LikeCount}
          </Button>
          <Button size="small" color="primary" onClick={() => {}}>
            <MdDeleteForever fontSize="small" />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
