import { useContext } from 'react';
import { CommunityContext } from './CommunityContext';

function BoardHeader() {
  const { community, avatar, cover, slogan, name } =
    useContext(CommunityContext);
  if (!name) {
    return null;
  }
  return (
    <>
      <div
        className="h-20 bg-cover"
        style={{
          backgroundImage: `url('${cover}')`,
        }}
      ></div>
      <div className="bg-reddit_dark-brighter">
        <div className="mx-6 relative flex">
          <div className="h-20 w-20  rounded-full overflow-hidden relative -top-3 border-4 border-white bg-white ">
            <img
              style={{ width: '100%', height: '100%' }}
              className=" bg-center object-cover"
              src={avatar}
              alt=""
            />
          </div>
          <div className="pt-2 pl-4">
            <h1 className="text-gray-300 text-3xl mobile:text-2xl">
              {name} : {slogan}
            </h1>
            <h5 className="text-gray-500">r/{community}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardHeader;
