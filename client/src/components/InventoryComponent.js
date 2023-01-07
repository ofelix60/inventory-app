import { useEffect, useState } from 'react';
import auth from '../api/auth';
import MagicInventoryItem from './MagicInventoryItem';

function InventoryComponent({ item }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const loadItems = async () => {
      const response = await auth.get(`itemById/${item.itemId}`);
      setItems(response.data);
    };
    loadItems();
    console.log('HEY, LOOK AT ME', items);
  }, [item]);
  const deleteFromInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.delete(
        `deleteFromInventory/${+item.id}/${item.userUuid}`
      );
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='w-auto'>
      {items && (
        <MagicInventoryItem
          deleteFromInventory={deleteFromInventory}
          items={items}
        />
      )}
    </div>
  );
}

export default InventoryComponent;
