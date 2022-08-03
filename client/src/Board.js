import { useContext, useEffect } from 'react';
import BoardHeader from './BoardHeader';
import PostForm from './PostForm';
import PostsListing from './PostsListing';
import { CommunityContext } from './CommunityContext';
import { useParams } from 'react-router-dom';
function Board() {
  const { community: communityFromUrl } = useParams();
  const { setCommunity } = useContext(CommunityContext);

  useEffect(() => {
    setCommunity(communityFromUrl);
  }, [communityFromUrl]);

  return (
    <div>
      <BoardHeader />
      <PostForm />
      <PostsListing />
    </div>
  );
}

export default Board;
