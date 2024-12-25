import React, { useState } from 'react';
import './PostCard.css';
import { PostCardProps } from '../../models/PostCard.model';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { PostServiceImpl } from '../../services/PostService';


interface PostCardExtendedProps extends PostCardProps {
  onDelete?: (id: number) => void;
  onArchive?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const PostCard: React.FC<PostCardExtendedProps> = (props: PostCardExtendedProps) => {
  const postService = new PostServiceImpl('/api');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(props.num_likes);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    if (props.onDelete && props.id !== undefined) {
      props.onDelete(props.id);
    }
    handleMenuClose();
  };

  const handleArchive = () => {
    if (props.onArchive && props.id !== undefined) {
      props.onArchive(props.id);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (props.onEdit && props.id !== undefined) {
      props.onEdit(props.id);
    }
    handleMenuClose();
  };

  const handleLikeClicked = async () => {
    try {
      if (props.id === undefined) {
        console.error("Post ID is undefined");
        return;
      }
      
      const post = await postService.getPost(props.id);
      if (!post) {
          console.error("Post not found");
          return;
      }

      const updatedPost = {
          ...post,
          num_likes: (post.num_likes || 0) + 1,
      };
      setLiked((prevLiked: any) => !prevLiked);
      setNumLikes((prev) => liked ? prev - 1 : prev + 1);
      const newPost = await postService.updatePost(updatedPost);
      console.log(newPost);

    } catch (error) {
        console.error("Failed to update post likes:", error);
        setLiked((prevLiked: any) => !prevLiked);
      }
  };

  const handleCommentClicked = () => {
    
  }

  const handleSendClicked = () => {

  }

  const descriptionLength = props.description?.length || 0;

  return (
    <div className="card-container">
      <Card sx={{ width: 420, padding: 1 }} className="post-card">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#0056b3', fontWeight: '700' }} aria-label="recipe">
              JD
            </Avatar>
          }
          action={
            <>
              <IconButton
                aria-label="more"
                aria-controls={open ? 'post-options-menu' : undefined}
                aria-haspopup="true"
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="post-options-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'post-options-menu-button',
                }}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleArchive}>Archive</MenuItem>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
              </Menu>
            </>
          }
          title="John Doe"
          titleTypographyProps={{ fontWeight: '700', fontSize: '1rem' }}
          subheader={`${props.time} ${props.date}`}
        />
        <img id="image" src={props.image_url} alt="" />
        <div className="metric-icons">
          <div className="like">
          {liked ? (
                <ThumbUpIcon
                    sx={{
                        color: '#0056b3',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, color 0.2s'
                    }}
                    onClick={handleLikeClicked}
                />
            ) : (
                <ThumbUpOutlinedIcon
                    sx={{
                        color: '#0056b3',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, color 0.2s'
                    }}
                    onClick={handleLikeClicked}
                />
            )}
            <div className="num-likes">{numLikes}</div>
          </div>
          <div className="comment">
            <CommentOutlinedIcon 
              sx={{
                color: '#0056b3',
                cursor: 'pointer',
                transition: 'transform 0.2s, color 0.2s'
            }}
            onMouseEnter={() => {}}
            onClick={() => {}}
            />
            <div className="num-likes">{props.num_comments}</div>
          </div>
          <div className="send">
            <SendOutlinedIcon 
              sx={{
                color: '#0056b3',
                cursor: 'pointer',
                transform: 'rotate(-30deg)',
                transition: 'transform 0.2s, color 0.2s'
            }}
            onMouseEnter={() => {}}
            onClick={() => {}}
            />
            <div className="num-likes">{props.num_shares}</div>
          </div>
        </div>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <div
              className={`description-container ${
                expanded ? 'expanded' : ''
              }`}
            >
              {props.description}
            </div>
            {!expanded && descriptionLength > 100 && (
              <button onClick={toggleExpanded} className="view-more-btn">
                View More
              </button>
            )}
            {expanded && (
              <button onClick={toggleExpanded} className="view-more-btn">
                View Less
              </button>
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export { PostCard };