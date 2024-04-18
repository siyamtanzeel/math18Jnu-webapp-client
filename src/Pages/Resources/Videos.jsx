import ReactPlayer from "react-player";

const Videos = () => {
  return (
    <div className="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-8">
      <div className=" space-y-2">
        <ReactPlayer
          className="max-w-72 md:max-w-80"
          controls
          url="https://www.youtube.com/live/3lc2Z0DL5AU?feature=shared"></ReactPlayer>
        <p className="text-center">This is a video</p>
      </div>
      <div className=" space-y-2">
        <ReactPlayer
          className="max-w-72 md:max-w-80"
          controls
          url="https://www.youtube.com/live/3lc2Z0DL5AU?feature=shared"></ReactPlayer>
        <p className="text-center">This is a video</p>
      </div>
      <div className=" space-y-2">
        <ReactPlayer
          className="max-w-72 md:max-w-80"
          controls
          url="https://www.youtube.com/live/3lc2Z0DL5AU?feature=shared"></ReactPlayer>
        <p className="text-center">This is a video</p>
      </div>
      <div className=" space-y-2">
        <ReactPlayer
          className="max-w-72 md:max-w-80"
          controls
          url="https://www.youtube.com/live/3lc2Z0DL5AU?feature=shared"></ReactPlayer>
        <p className="text-center">This is a video</p>
      </div>
      <div className=" space-y-2">
        <ReactPlayer
          className="max-w-72 md:max-w-80"
          controls
          url="https://www.youtube.com/live/3lc2Z0DL5AU?feature=shared"></ReactPlayer>
        <p className="text-center">This is a video</p>
      </div>
      <div className=" space-y-2">
        <ReactPlayer
          className="max-w-72 md:max-w-80"
          controls
          url="https://www.youtube.com/live/3lc2Z0DL5AU?feature=shared"></ReactPlayer>
        <p className="text-center">This is a video</p>
      </div>
    </div>
  );
};
export default Videos;
