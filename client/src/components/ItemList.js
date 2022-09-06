import MagicCard from './MagicCard';
import WeaponsCard from './WeaponsCard';

const ItemList = ({ item }) => {
  const isWeapon = item.itemDesc;
  if (!item) {
    return;
  } else {
    if (!isWeapon) {
      return <WeaponsCard item={item} />;
    }
    return <MagicCard item={item} />;
  }
};

export default ItemList;
