import { useEffect, useState } from 'react';
import InventoryComponent from './InventoryComponent';
import MenuInventory from './MenuInventory';
import { getInventory } from '../api/auth';

function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const uuid = localStorage.getItem('user');
    console.log('uuid: ', uuid);

    const loadItems = async () => {
      const response = await getInventory(uuid);
      console.log(response);
      setItems(response.data);
    };
    loadItems();
  }, []);
  console.log(items);
  return (
    <div className=''>
      <MenuInventory />
      <h1 className='m-10 mt-32 text-5xl'>Inventory</h1>
      <div className='m-10 mt-10'>
        {items.map((item, i) => {
          return <InventoryComponent key={i} item={item} />;
        })}
      </div>
    </div>
    //
  );
}

export default Inventory;
