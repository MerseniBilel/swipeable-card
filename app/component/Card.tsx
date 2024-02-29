import {DataType} from '../data/data';
import {Image, Text, View} from 'react-native';
import CardWrapper from './CardWrapper';
import CardTextItems from './CardTextItems';
import {CardInfo} from './CardInfo';
import {SharedValue} from 'react-native-reanimated';
import {RotateCw} from 'lucide-react-native';
type Props = {
  index: number;
  item: DataType;
  mockData: DataType[];
  dataLength: number;
  maxVisibleItems: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  swipeEnabled: boolean;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setMockData: React.Dispatch<React.SetStateAction<DataType[]>>;
};
const Card = ({
  item,
  index,
  maxVisibleItems,
  currentIndex,
  dataLength,
  mockData,
  setMockData,
  setCurrentIndex,
  animatedValue,
  swipeEnabled,
}: Props) => {
  return (
    <CardWrapper
    swipeEnabled={swipeEnabled}
      setMockData={setMockData}
      mockData={mockData}
      setCurrentIndex={setCurrentIndex}
      animatedValue={animatedValue}
      currentIndex={currentIndex}
      maxVisibleItems={maxVisibleItems}
      dataLength={dataLength}
      index={index}
      item={item}>
      <View className="flex flex-1 flex-row justify-between items-center">
        <CardTextItems text={item.name} />
        <View className="w-20 h-10">
          <Image
            className="w-20 h-10"
            style={{resizeMode: 'contain'}}
            source={item.image}
          />
        </View>
      </View>
      <View className="flex-[2] justify-center">
        <CardTextItems text={item.number} />
      </View>
      <CardInfo expiry={item.exp} cvv={item.cvv} />
    </CardWrapper>
  );
};

export default Card;
