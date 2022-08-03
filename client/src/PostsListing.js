import Post from './Post';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CommunityContext } from './CommunityContext';

function PostsListing() {
  const [comments, setComments] = useState([]);
  const { community } = useContext(CommunityContext);
  useEffect(() => {
    let url = '/comments';
    if (community) {
      url += `?community=${community}`;
    }
    axios
      .get(url, { withCredentials: true })
      .then((response) => setComments(response.data));
  }, [community]);

  return (
    <div className="bg-reddit_dark">
      {comments.map((comment) => (
        <Post {...comment} isListing={true} />
      ))}
    </div>
  );
}

export default PostsListing;
