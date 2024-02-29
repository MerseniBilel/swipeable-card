import {View, Image, Text} from 'react-native';
import {ActivityType} from '../data/data';

type Props = {
  item: ActivityType;
};

const Activity = ({item}: Props) => {
  return (
    <View className='flex flex-row justify-between items-center my-[14px] mx-4'>
      <View className='bg-[#222222] rounded-2xl'>
        <Image style={{resizeMode: 'contain', margin: 14}} source={item.image} className="h-11 w-11" />
      </View>
      <View className='flex-1 mx-4'>
        <Text className='text-white font-bold text-xl'>{item.name}</Text>
        <Text className='text-white'>{item.date}</Text>
      </View>
      <Text className='text-white text-lg font-bold'>{item.price}</Text>
    </View>
  );
};

export default Activity;
