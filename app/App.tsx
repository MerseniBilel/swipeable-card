import React, {useState} from 'react';
import {Text, SafeAreaView, View, ScrollView, Pressable} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {data} from './data/data';
import Card from './component/Card';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import '../global.css';
import {RotateCw} from 'lucide-react-native';
import Activity from './component/Activity';

function App(): React.JSX.Element {
  const [mockData, setMockData] = useState([...data, ...data]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);

  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    if (animatedValue.value > currentIndex + 0.5) {
      runOnJS(setActivityIndex)(currentIndex + 1);
    } else {
      runOnJS(setActivityIndex)(currentIndex);
    }

    const opacity = interpolate(
      animatedValue.value,
      [currentIndex, currentIndex + 0.3, currentIndex + 0.8, currentIndex + 1],
      [1, 0, 0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacity,
    };
  });

  const MAX = 3;

  // todo all do next time
  const tap = Gesture.Tap().numberOfTaps(2).onStart(e => {
    // console.log('double tap');
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView className="flex-1 bg-[#111111]">
        <GestureDetector gesture={tap}>
          <View className="flex-1 justify-center items-center">
            {mockData.map((item, idx) => {
              if (idx > MAX + currentIndex || idx < currentIndex) {
                return null;
              }
              return (
                <Card
                  swipeEnabled={true}
                  setMockData={setMockData}
                  currentIndex={currentIndex}
                  maxVisibleItems={MAX}
                  dataLength={mockData.length}
                  key={idx}
                  item={item}
                  index={idx}
                  animatedValue={animatedValue}
                  setCurrentIndex={setCurrentIndex}
                  mockData={mockData}
                />
              );
            })}
          </View>
        </GestureDetector>
        <Text className="text-white font-bold text-2xl px-4">
          Recent Activity
        </Text>
        <View style={{flex: 3 / 2}} className="justify-center items-center">
          <Animated.ScrollView style={[{width: '100%'}, animatedStyle]}>
            {mockData[activityIndex].activity.map((ac, idx) => {
              return <Activity item={ac} key={idx} />;
            })}
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
