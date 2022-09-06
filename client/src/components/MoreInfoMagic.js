import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

const MoreInfoMagic = ({ items }) => {
  const [modal, setModal] = useState(false);
  return (
    <div className='flex flex-col px-7 py-14 justify-start'>
      <div className='flex w-full'>
        <h1 className='text-3xl'>{items.itemName}</h1>
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
            <span>{items.itemType}</span>
          </div>
          <div className='mr-10'>
            <span>
              <strong>Rarity: </strong>
            </span>
            <span>{items.rarity}</span>
          </div>
          {items.requiresAttunement !== null ? (
            <div className='mr-10'>
              <span>
                <strong>{items.requiresAttunement}</strong>
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
          <ReactMarkdown>{items.itemDesc}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default MoreInfoMagic;
