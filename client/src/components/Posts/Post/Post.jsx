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

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MdMoreHoriz fontSize="default" />
          </Button>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => {}}>
            <FaRegThumbsUp fontSize="small" />
            Like0
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
