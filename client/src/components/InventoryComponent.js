import { useEffect, useState } from 'react';
import axios from 'axios';
import MagicInventoryItem from './MagicInventoryItem';

function InventoryComponent({ item }) {
  const [items, setItems] = useState([]);
  // console.log(item);
  useEffect(() => {
    const loadItems = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/itemById/${item.itemId}`
      );
      setItems(response.data);
    };
    loadItems();
  }, [item]);
  const deleteFromInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteFromInventory/${+item.id}/${
          item.userUuid
        }`
      );
      console.log(response);
      window.location.reload(false);
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
