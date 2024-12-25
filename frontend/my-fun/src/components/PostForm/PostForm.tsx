import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { PostServiceImpl } from '../../services/PostService';
import { Post } from '../../models/PostCard.model';

interface PostFormProps {
  open: boolean;
  onPostCreated: () => void;
  onClose: () => void;
}

const postURL = 'api';
const postService = new PostServiceImpl(postURL);

const PostForm: React.FC<PostFormProps> = ({ open, onClose, onPostCreated }) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const imageUrl = formData.get("imgURL") as string; 
      const description = formData.get("description") as string;
      const time = new Date().toLocaleTimeString();
      const date = new Date().toLocaleDateString();
      const post: Post = {
          description: description,
          author_id: 1,
          state: 2,
          image_url: imageUrl,
          num_likes: 0,
          num_shares: 0,
          num_comments: 0,
          time: time,
          date: date
      }
    await postService.createPost(post);
    onPostCreated();
    onClose();
    };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-post-modal">
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '57%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 600,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="create-post-modal" variant="h6" component="h2" gutterBottom>
          Create a Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="imgURL"
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          {/* <TextField
            name="title"
            label="Image 2"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="title"
            label="Image 3"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="image1"
            label="Image 4"
            variant="outlined"
            fullWidth
            margin="normal"
          /> */}
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#0056b3' }}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export { PostForm };
