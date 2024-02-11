import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typograghy,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbsUpAl";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";

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
          <Typograghy variant="h6">{post.creator}</Typograghy>
          <Typograghy variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typograghy>
        </div>
        <div className={classes.overlay2}>
          <Button style={{color: 'white'}} size="small" onClick={()=> }>
            <MoreHorizIcon fontSize="default"/>
          </Button>
        </div>
        <div className={classes.details}>
        <Typograghy variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typograghy>
        </div>
        <Typograghy className={classes.title} variant="h5" gutterBottom>{post.message}</Typograghy>
      </Card>
    </>
  );
};

export default Post;
