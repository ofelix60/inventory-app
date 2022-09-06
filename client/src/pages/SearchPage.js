import InventoryInput from '../components/InventoryInput';
import ItemList from '../components/ItemList';
import { useState } from 'react';
import MenuSearchPage from '../components/MenuSearchPage';

function SearchPage() {
  const [item, setItem] = useState('');
  // console.log(item);
  return (
    <div className='flex flex-col m-10 '>
      <MenuSearchPage />
      <InventoryInput setItem={setItem} />
      <ItemList item={item} />
    </div>
  );
}

export default SearchPage;
