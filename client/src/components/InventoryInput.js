import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Suggestions from './Suggestions';

function InventoryInput(props) {
  // autocomplete
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const loadItems = async () => {
      const response = await axios.get('http://localhost:8000/api/allItems');
      setItems(response.data);
    };
    loadItems();
  }, []);

  useEffect(() => {
    let matches = [];
    if (text.length > 0) {
      props.setItem('');
      matches = items.filter((item) => {
        const regex = new RegExp(`${text}`, 'gi');
        return item.itemName.match(regex);
      });
    }

    setSuggestions(matches);
    setText(text);
  }, [text, props, items]);

  const onSubmitForm = async (e, searchTerm = text) => {
    e.preventDefault();
    props.setItem(await getItem(searchTerm));
    setText('');
    setSuggestions([]);
  };

  const getItem = async (searchTerm = text) => {
    let slug = searchTerm
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(',', '');

    try {
      const response = await axios.get(
        `http://localhost:8000/api/itemBySlug/${slug}`
      );

      const jsonData = await response.data;
      return jsonData;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='flex flex-col px-20 pt-14 pb-36 mt-20 mx-auto  rounded w-full'>
      <form
        onSubmit={onSubmitForm}
        name='search'
        className='flex flex-col content-center '
      >
        <input
          ref={inputRef}
          type='text'
          className='p-2 px-1 mt-5 w-full'
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#2d2a2e',
          }}
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder=' Search Items'
        />
        {suggestions && (
          <Suggestions
            suggestions={suggestions}
            setText={setText}
            onSubmitForm={onSubmitForm}
            inputRef={inputRef}
          />
        )}
      </form>
    </div>
  );
}

export default InventoryInput;
