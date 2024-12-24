import React, { useState } from 'react';
import './PostCard.css';
import { PostCardProps } from '../../models/PostCard.model';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import { red } from '@mui/material/colors';


interface PostCardExtendedProps extends PostCardProps {
    onDelete?: (id: number) => void;
    onArchive?: (id: number) => void;
    onEdit?: (id: number) => void;
  }

const PostCard: React.FC<PostCardExtendedProps> = (props: PostCardExtendedProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Open menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Close menu
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Handle each menu action (delete, archive, edit)
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
    return (
        <div className='card-container'>
            <Card sx={{ 
                width: 420, 
                height: 500,
                padding: 1
                }}
                className='post-card'
            >
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        JD
                    </Avatar>
                    }
                    action={
                        <>
                        {/* IconButton that opens the menu */}
                        <IconButton 
                          aria-label="more"
                          aria-controls={open ? 'post-options-menu' : undefined}
                          aria-haspopup="true"
                          onClick={handleMenuOpen}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        {/* The Menu itself */}
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
                    subheader={`${props.time} ${props.date}`}
                />
                <img id="image" src={props.image_url} alt="" />
                <div className="metric-icons">
                    <div className="like">
                        <ThumbUpIcon sx={{ color: '#0056b3' }}/>
                        <div className="num-likes">{props.num_likes}</div>
                    </div>
                    <div className="comment">
                        <CommentIcon sx={{ color: '#0056b3' }}/>
                        <div className="num-likes">{props.num_comments}</div>
                    </div>
                    <div className="send">
                        <SendIcon sx={{ color: '#0056b3' }}/>
                        <div className="num-likes">{props.num_shares}</div>
                    </div> 
                </div>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                </CardActions>
            </Card>
        </div>
    );
}

export { PostCard }