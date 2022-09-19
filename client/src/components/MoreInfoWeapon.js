import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

const MoreInfoMagic = ({ items }) => {
  const [modal, setModal] = useState(false);

  return (
    <div className='flex flex-col px-7 py-14 justify-start'>
      <div className='flex w-full'>
        <h1 className='text-3xl'>{items?.itemName}</h1>
      </div>
      <div className='flex flex-col my-5 items-start '>
        <div className='flex flex-row'>
          <span
            className=''
            style={{ fontSize: '24px', fontWeight: 'lighter' }}
          >
            {items?.category}
            <span className='' style={{ fontSize: '24px' }}>
              {items?.category.includes('Ranged') ? '🏹' : '⚔️'}
            </span>
          </span>
        </div>
        <div className='flex ml-auto  justify-between'>
          <div className='flex ml-auto items-start mr-10'>
            <span>
              <strong>Damage: </strong>
            </span>
            <span>
              {items?.damageDice} {items?.damageType}
            </span>
          </div>
          <div className='mr-10'>
            <span>
              <strong>Weight: </strong>
            </span>
            <span>{items?.itemWeight}</span>
          </div>
          <div className='mr-10'>
            <span>
              <strong>Cost: </strong>
            </span>
            <span>{items?.cost}</span>
          </div>
        </div>
      </div>
      <div className='flex mt-5 items-baseline'>
        <p className=''>
          <strong>Properties:</strong>
        </p>
        <div className='mt-3 ml-14'>
          <p>{items?.properties}</p>
        </div>
      </div>
    </div>
  );
};
export default MoreInfoMagic;
