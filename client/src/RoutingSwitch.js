import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Board from './Board';
import CommentPage from './CommentPage';
import CommentModal from './CommentModal';
import SearchResultsPage from './SearchResultsPage';

function RoutingSwitch() {
  const location = useLocation();
  const [commentId, setCommentId] = useState(null);

  const history = useHistory();

  if (location?.state?.commentId) {
    if (location?.state?.source) {
      location.pathname = '/r/' + location.state.source;
    } else {
      location.pathname = '/';
    }
    if (!commentId) {
      setCommentId(location.state.commentId);
    }
  }

  function close() {
    history.push({ pathname: location.pathname });
    setCommentId(null);
  }

  return (
    <div>
      {commentId && (
        <div>
          <CommentModal
            id={commentId}
            open={!!commentId}
            onClickOut={() => close()}
          />
        </div>
      )}
      <Switch location={location}>
        <Route exact path="/" component={Board} />
        <Route exact path="/r/:community" component={Board} />
        <Route exact path="/comments/:id" component={CommentPage} />
        <Route exact path="/search/:text" component={SearchResultsPage} />
      </Switch>
    </div>
  );
}

export default RoutingSwitch;
