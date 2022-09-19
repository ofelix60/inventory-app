import DemoInventoryInput from '../components/DemoInventoryInput';
import DemoItemList from '../components/DemoItemList';
import { useState } from 'react';

function SearchPage() {
  const [item, setItem] = useState('');
  return (
    <div className='flex flex-col m-10 '>
      <DemoInventoryInput setItem={setItem} />
      <DemoItemList item={item} />
    </div>
  );
}

export default SearchPage;
