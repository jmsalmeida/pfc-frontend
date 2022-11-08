import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { CreateFeaturesList } from '../create-features-list';

export function SelectTypes({ text1, text2, constant, list, setList }) {
  return (
    <View>
      <View style={{ paddingVertical: 20 }}>
        <Text category="h4">{text1}</Text>
        <Text category="p1">{text2}</Text>
      </View>

      <CreateFeaturesList featureTypes={constant} list={list} setList={setList} />
    </View>
  );
}
