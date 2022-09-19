import ReactMarkdown from 'react-markdown';
import Button from './Button';
import { BsPlus } from 'react-icons/bs';
import auth from '../api/auth';

function MagicCard({ item }) {
  const userId = localStorage.getItem('user');
  const addToInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.post('addToInventory', {
        items_id: item.id,
        inventory_id: userId,
      });
      notification();
    } catch (err) {
      console.error(err.message);
    }
  };
  const notification = () => {
    const popup = document.getElementById('notification-container');
    popup.classList.add('show');
    setTimeout(() => {
      popup.classList.remove('show');
    }, 1000);
  };
  return (
    <div className='flex flex-col mt-8 p-12 bg-[#f5f5f5] outline-1 outline outline-gray-500'>
      <div className='notification-container ' id='notification-container'>
        <p>Item added</p>
      </div>
      <div className='flex items-center'>
        <h1 className='text-3xl'>{item.itemName}</h1>
        <Button
          icon={<BsPlus size='32' />}
          className='ml-auto'
          text='Add to Inventory'
          item={item}
        />
      </div>
      <div className='flex my-5 items-center '>
        <div className='flex flex-row'>
          <span
            className=''
            style={{ fontSize: '24px', fontWeight: 'lighter' }}
          >
            Magic Item
            <span className='ml-auto' style={{ fontSize: '24px' }}>
              🪄
            </span>
          </span>
        </div>
        <div className='flex ml-auto justify-between'>
          <div className='flex ml-auto mr-10'>
            <span className=''>
              <strong>Type: </strong>
            </span>
            <span>{item.itemType}</span>
          </div>
          <div className='mr-10'>
            <span>
              <strong>Rarity: </strong>
            </span>
            <span>{item.rarity}</span>
          </div>
          {item.requiresAttunement !== null ? (
            <div className='mr-10'>
              <span>
                <strong>{item.requiresAttunement}</strong>
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='flex mt-5 items-baseline'>
        <p className=''>
          <strong>Description:</strong>
        </p>
        <div className='mt-3 ml-14'>
          <ReactMarkdown>{item.itemDesc}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default MagicCard;
