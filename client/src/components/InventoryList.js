// import ReactMarkdown from 'react-markdown';
import MoreInfoMagic from './MoreInfoMagic';
import MoreInfoWeapon from './MoreInfoWeapon';

const InventoryList = ({ items }) => {
  const isWeapon = items.itemDesc;
  if (!isWeapon) {
    return <MoreInfoWeapon items={items} />;
  }
  return <MoreInfoMagic items={items} />;
};

export default InventoryList;
