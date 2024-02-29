import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {DataType} from '../data/data';
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useWindowDimensions} from 'react-native';

const CARD_WIDTH = 360;
const CARD_HEIGHT = 200;

type CardWrapperProps = {
  item: DataType;
  mockData: DataType[];
  index: number;
  currentIndex: number;
  animatedValue: SharedValue<number>;
  dataLength: number;
  maxVisibleItems: number;
  swipeEnabled: boolean;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setMockData: React.Dispatch<React.SetStateAction<DataType[]>>;
  children: string | JSX.Element | JSX.Element[];
};
const CardWrapper = ({
  item,
  index,
  animatedValue,
  currentIndex,
  dataLength,
  setCurrentIndex,
  maxVisibleItems,
  mockData,
  swipeEnabled,
  setMockData,
  children,
}: CardWrapperProps) => {
  const {width} = useWindowDimensions();

  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(e => {
      if (swipeEnabled) {
        const isSwipeRight = e.translationX > 0;
        direction.value = isSwipeRight ? 1 : -1;

        if (index === currentIndex) {
          translateX.value = e.translationX;
          animatedValue.value = interpolate(
            Math.abs(e.translationX),
            [0, width],
            [index, index + 1],
          );
        }
      }
    })
    .onEnd(e => {
      if (swipeEnabled) {
        if (currentIndex === index) {
          if (
            Math.abs(e.translationX) > CARD_WIDTH / 2.5 ||
            Math.abs(e.velocityX) > 1000
          ) {
            translateX.value = withTiming(
              width * direction.value,
              {duration: 200},
              () => {
                runOnJS(setCurrentIndex)(currentIndex + 1);
                runOnJS(setMockData)([...mockData, mockData[currentIndex]]);
              },
            );
            animatedValue.value = withTiming(currentIndex + 1, {duration: 200});
          } else {
            translateX.value = withTiming(0, {duration: 300});
            animatedValue.value = withTiming(currentIndex, {duration: 300});
          }
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    // todo: remove the current item and use the currentindex and see the result
    const currentItem = index === currentIndex;
    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
    );

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-30, 0],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1],
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItems,
      [index, index + 1],
      [0, 1],
    );

    return {
      transform: [
        {
          // * that mean the first card will be 1 and the last card will be 0.5
          scale: currentItem ? 1 : scale,
        },
        {
          // * that mean the first card will be 0 and the last card will be -150
          translateY: currentItem ? 0 : translateY,
        },
        {
          translateX: translateX.value,
        },
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg',
        },
      ],
      opacity: index < maxVisibleItems + currentIndex ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        className="absolute rounded-3xl p-4"
        style={[
          {
            backgroundColor: item.backgroundColor,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            // * that mean the fist index will take the largest zIndex
            zIndex: dataLength - index,
          },
          animatedStyle,
        ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default CardWrapper;
