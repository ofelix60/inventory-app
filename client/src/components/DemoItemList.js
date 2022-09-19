import DemoMagicCard from './DemoMagicCard';
import DemoWeaponCard from './DemoWeaponCard';

const ItemList = ({ item }) => {
  const isWeapon = item.itemDesc;
  if (!item) {
    return;
  } else {
    if (!isWeapon) {
      return <DemoWeaponCard item={item} />;
    }
    return <DemoMagicCard item={item} />;
  }
};

export default ItemList;
