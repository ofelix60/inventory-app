import Button from './Button';
import { BsPlus } from 'react-icons/bs';

function WeaponsCard({ item }) {
  return (
    <div className='flex flex-col mt-8 p-12 bg-[#f5f5f5] outline-1 outline outline-gray-500'>
      <div className='notification-container' id='notification-container'>
        <p>Item added</p>
      </div>
      <div className='flex items-center'>
        <h1 className='text-3xl'>{item.itemName}</h1>
        <Button
          icon={<BsPlus size='32' />}
          className='ml-auto'
          text='Log in/register to manage inventory'
          item={item}
        />
      </div>
      <div className='flex my-5 items-center'>
        <span className='' style={{ fontSize: '24px', fontWeight: 'lighter' }}>
          {item.category}
          <span className='' style={{ fontSize: '24px' }}>
            {item.category.includes('Ranged') ? '🏹' : '⚔️'}
          </span>
        </span>
      </div>
      <div className='flex ml-auto justify-between'>
        <div className='flex ml-auto mr-10'>
          <span>
            <strong>Damage: </strong>
          </span>
          <span>
            {item.damageDice} {item.damageType}
          </span>
        </div>
        <div className='mr-10'>
          <span>
            <strong>Weight: </strong>
          </span>
          <span>{item.itemWeight}</span>
        </div>
        <div className='mr-10'>
          <span>
            <strong>Cost: </strong>
          </span>
          <span>{item.cost}</span>
        </div>
      </div>
      <div className='flex mt-5 items-baseline'>
        <p className=''>
          <strong>Properties:</strong>
        </p>
        <div className='mt-3 ml-14'>
          <p>{item.properties}</p>
        </div>
      </div>
    </div>
  );
}

export default WeaponsCard;
