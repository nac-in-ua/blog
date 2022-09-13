type PropsType = {
  postId: string;
};

const Comments = ({ postId }: PropsType) => {
  return (
    <>
      <p>Comments</p>
      <div className="flex flex-row items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <div className="font-bold text-gray-700">John Doe</div>
            <div className="text-sm text-gray-500">1 day ago</div>
          </div>
          <div className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc sit amet ultricies lacinia, nunc nisl ultricies nisl,
            nec ultricies nisl nunc vel nisl. Sed euismod, nunc sit amet
            ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc
            vel nisl.
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <div className="font-bold text-gray-700">John Doe</div>
            <div className="text-sm text-gray-500">1 day ago</div>
          </div>

          <div className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc sit amet ultricies lacinia, nunc nisl ultricies nisl,
            nec ultricies nisl nunc vel nisl. Sed euismod, nunc sit amet
            ultricies lacinia, nunc nisl ultricies nisl, nec ultricies nisl nunc
            vel nisl.
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
