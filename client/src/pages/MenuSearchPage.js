import { GiOpenChest } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const MenuSearchPage = () => {
  return (
    <div className='fixed top-0 left-0 w-screen flex justify-end bg-[#2d2a2e] border-b-2 border-[#2d2a2e] h-20'>
      <Link to='/inventory'>
        <Icon className='' text='Inventory' icon={<GiOpenChest size='20' />} />
      </Link>
    </div>
  );
};

export default MenuSearchPage;
