import { MouseEvent } from 'react';

import { DotsVerticalIcon } from '@heroicons/react/outline';
const MenuButton = () => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log('menu Opened');
  };
  return (
    <div className="flex items-center justify-center">
      <div onClick={handleClick}>
        <DotsVerticalIcon className="h-5 w-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default MenuButton;
