import {Text, View} from 'react-native';
type CardInfoProps = {
  cvv: string;
  expiry: string;
};
export const CardInfo = ({cvv, expiry}: CardInfoProps) => {
  return (
    <View className="flex-1 flex-row gap-14">
      <View>
        <Text className="text-lg text-white">Valid Thru</Text>
        <Text className="text-lg text-white">{expiry}</Text>
      </View>
      <View>
        <Text className="text-lg text-white">CVV</Text>
        <Text className="text-lg text-white">{cvv}</Text>
      </View>
    </View>
  );
};
