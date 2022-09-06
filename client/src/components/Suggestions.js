import { useEffect, useRef } from 'react';

function Suggestions({ suggestions, setText, onSubmitForm, inputRef }) {
  const resultsRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
  useEffect(() => {
    function onKeyDown(event) {
      const isUp = event.key === 'ArrowUp';
      const isDown = event.key === 'ArrowDown';
      const inputIsFocused = document.activeElement === inputRef.current;
      const resultsItems = Array.from(resultsRef.current.children);
      const activeResultIndex = resultsItems.findIndex((child) => {
        return child.querySelector('a') === document.activeElement;
      });
      if (isUp) {
        if (inputIsFocused) {
          resultsItems[resultsItems.length - 1].querySelector('a').focus();
        } else if (resultsItems[activeResultIndex - 1]) {
          resultsItems[activeResultIndex - 1].querySelector('a').focus();
        } else {
          inputRef.current.focus();
        }
      }
      if (isDown) {
        if (inputIsFocused) {
          resultsItems[0].querySelector('a').focus();
        } else if (resultsItems[activeResultIndex + 1]) {
          resultsItems[activeResultIndex + 1].querySelector('a').focus();
        } else {
          inputRef.current.focus();
        }
      }
    }
    if (suggestions.length > 0) {
      document.body.addEventListener('keydown', onKeyDown);
    } else {
      document.body.removeEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.removeEventListener('keydown', onKeyDown);
    };
  }, [suggestions, inputRef]);

  return (
    <div>
      <div className=''>
        <ul
          className='max-h-28 min-w-28 overflow-scroll overflow-x-hidden absolute cursor-pointer w-10/12  bg-white'
          ref={resultsRef}
        >
          {suggestions.map((suggestion, i) => {
            return (
              <li
                style={{ padding: 0, margin: 0 }}
                key={i}
                className='text-black mt-1 w-full hover:text-black hover:bg-slate-300 '
                onClick={(e) => {
                  setText(suggestion.itemName);
                  onSubmitForm(e, suggestion.itemName);
                }}
              >
                <a className='ml-1 w-5/6 ' href={'/'}>
                  {suggestion.itemName}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Suggestions;
