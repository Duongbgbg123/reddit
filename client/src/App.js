import './style.css';
import AuthModalContext from './AuthModalContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import Routing from './Routing';
import PostFormModalContext from './PostFormModalContext';
import RedirectContext from './RedirectContext';
import { CommunityContextProvider } from './CommunityContext';

axios.defaults.baseURL = 'http://localhost:4000';
function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostFormModal, setShowPostFormModal] = useState(false);
  const [user, setUser] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get('/user', { withCredentials: true })
      .then((response) => setUser(response.data));
  }, []);
  function logout() {
    axios
      .post('/logout', {}, { withCredentials: true })
      .then(() => setUser({}));
  }

  return (
    <AuthModalContext.Provider
      value={{ show: showAuthModal, setShow: setShowAuthModal }}
    >
      <PostFormModalContext.Provider
        value={{ show: showPostFormModal, setShow: setShowPostFormModal }}
      >
        <CommunityContextProvider>
          <UserContext.Provider value={{ ...user, logout, setUser }}>
            <RedirectContext.Provider value={{ redirect, setRedirect }}>
              <Routing />
            </RedirectContext.Provider>
          </UserContext.Provider>
        </CommunityContextProvider>
      </PostFormModalContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
