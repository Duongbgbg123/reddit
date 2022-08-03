import axios from 'axios';
import React, { useContext, useState } from 'react';
import Button from './Button';
import { CommunityContext } from './CommunityContext';
import Input from './Input';
import { PopUp } from './PopUp';
import RedirectContext from './RedirectContext';

export default function CommnityFormModal() {
  const { show, setShow } = useContext(CommunityContext);
  const { setRedirect } = useContext(RedirectContext);

  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('');
  if (!show) {
    return null;
  }

  function create() {
    const data = { name, slogan, avatar, cover };
    axios.post('/communities', data, { withCredentials: true }).then(() => {
      setRedirect(`/r/${name}`);
      setShow(false);
    });
  }

  return (
    <PopUp onClickOut={() => setShow(false)} open={show}>
      <h1 className="text-2xl mb-5">Create a New Subredit</h1>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={'Name'}
        className="w-full mb-2"
      />
      <Input
        value={slogan}
        onChange={(e) => setSlogan(e.target.value)}
        placeholder={'Slogan'}
        className="w-full mb-2"
      />
      <Input
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder={'Avatar Image url'}
        className="w-full mb-2"
      />
      <Input
        value={cover}
        onChange={(e) => setCover(e.target.value)}
        placeholder={'Cover Image url'}
        className="w-full mb-2"
      />
      <div className="text-right">
        <Button className={'px-4 py-2 mr-3'} outline>
          Cancel
        </Button>
        <Button onClick={() => create()} className={'px-4 py-2 mr-3'}>
          Subredit
        </Button>
      </div>
    </PopUp>
  );
}
