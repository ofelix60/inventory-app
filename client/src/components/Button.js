import auth from '../api/auth';

const Button = ({ item, icon, text = '💡 tooltip' }) => {
  const userId = localStorage.getItem('user');

  const addToInventory = async (e) => {
    e.preventDefault();
    try {
      await auth.post('addToInventory', {
        item_id: item.id,
        user_id: userId,
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
    }, 900);
  };

  const tooltipSpan = document.getElementById('tooltip-span');
  window.onmousemove = (e) => {
    let x = e.clientX;
    let y = e.clientY;

    tooltipSpan.style.top = y + 'px';
    tooltipSpan.style.right = x + 20 + 'px';
  };

  return (
    <div
      onClick={addToInventory}
      className=' flex items-center justify-center h-12 w-12 mt-3 mb-2 ml-auto mr-10 bg-[#2d2a2e] text-white hover:bg-[#191919] hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear cursor-pointer; group  content-center'
    >
      {icon}

      <span
        id='tooltip-span'
        className='fixed w-auto p-2 m-2 min-w-max  right-6 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100'
      >
        {text}
      </span>
    </div>
  );
};
export default Button;
