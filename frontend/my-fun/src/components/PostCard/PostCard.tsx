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
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';


interface PostCardExtendedProps extends PostCardProps {
  onDelete?: (id: number) => void;
  onArchive?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const PostCard: React.FC<PostCardExtendedProps> = (props: PostCardExtendedProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);

  // Open menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Toggle description view
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Handle actions
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
            <ThumbUpIcon sx={{ color: '#0056b3' }} />
            <div className="num-likes">{props.num_likes}</div>
          </div>
          <div className="comment">
            <CommentIcon sx={{ color: '#0056b3' }} />
            <div className="num-likes">{props.num_comments}</div>
          </div>
          <div className="send">
            <SendIcon sx={{ color: '#0056b3' }} />
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
