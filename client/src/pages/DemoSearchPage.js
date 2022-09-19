import DemoInventoryInput from '../components/DemoInventoryInput';
import DemoItemList from '../components/DemoItemList';
import { useState } from 'react';
import MenuSearchPage from '../components/MenuSearchPage';

function SearchPage() {
  const [item, setItem] = useState('');
  return (
    <div className='flex flex-col m-10 '>
      {/* <MenuSearchPage /> */}
      <DemoInventoryInput setItem={setItem} />
      <DemoItemList item={item} />
    </div>
  );
}

export default SearchPage;
