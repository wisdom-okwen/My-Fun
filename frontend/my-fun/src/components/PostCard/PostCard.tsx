import React from 'react';
import './PostCard.css';
import { PostCardProps } from '../../models/PostCard.model';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

type IPostCardProps = PostCardProps;

const PostCard: React.FC<PostCardProps> = (props: IPostCardProps) => {
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
                    <IconButton aria-label="settings" />
                    // </IconButton>
                    }
                    title="John Doe"
                    subheader={`${props.time} ${props.date}`}
                />
                <img id="image" src={props.image_url}
                    alt="" />
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