import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CommunityContext } from './CommunityContext';
import PostContent from './PostContent';

function Post(props) {
  const community = useContext(CommunityContext);

  let postClasses =
    'block border rounded-md ' +
    (props.open ? '' : 'hover:border-reddit_text cursor-pointer');
  if (props.isListing) {
    postClasses +=
      ' bg-reddit_dark-brighter p-3 mx-6 border-2 border-reddit_border';
  } else {
    postClasses += ' border-none';
  }
  return (
    <div className="text-reddit_text pb-4">
      {props.open && (
        <div className={postClasses}>
          <PostContent {...props} />
        </div>
      )}
      {!props.open && (
        <Link
          to={{
            pathname: '/comments/' + (props.rootId || props._id),
            state: { commentId: props.rootId || props._id },
            source: community,
          }}
          className={postClasses}
        >
          <PostContent {...props} />
        </Link>
      )}
    </div>
  );
}

export default Post;
