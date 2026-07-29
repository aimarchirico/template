import {Text, View} from 'react-native';

/**
 * Main index screen component.
 *
 * @returns The rendered index screen.
 */
export default function IndexScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-semibold">App</Text>
    </View>
  );
}
