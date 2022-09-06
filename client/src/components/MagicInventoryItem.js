import { useState } from 'react';
import InventoryList from './InventoryList';

const MagicInventoryItem = ({ items, deleteFromInventory }) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div className='flex items-center outline outline-1 outline-gray-500  mb-5 p-1 w-auto rounded-md h-20'>
      <div className='ml-10 '>
        <h1 className='text-xl font-bold'>{items.itemName}</h1>
        <p className='mb-1'>{items.itemType}</p>
      </div>
      <div className='ml-auto mr-10 mt-5 mb-4'>
        <a
          className='border-1 rounded-md bg-blue-600 py-2.5 px-5 text-white mr-10 cursor-pointer'
          onClick={toggleModal}
        >
          More Info
        </a>

        {modal && (
          <div className='modal'>
            <div onClick={toggleModal} className='overlay'>
              <div className='modal-content'>
                <InventoryList items={items} />

                <button className='close-modal' onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
        <a
          className='border-1 rounded-md bg-red-600 py-2.5 px-5 text-white'
          href='/inventory'
          onClick={deleteFromInventory}
        >
          Use
        </a>
      </div>
    </div>
  );
};
export default MagicInventoryItem;
