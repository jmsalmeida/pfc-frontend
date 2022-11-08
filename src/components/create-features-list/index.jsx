import { Tag } from '../Tag';
import { View } from 'react-native';
import { useCallback } from 'react';
import { Divider } from '@ui-kitten/components';

export function CreateFeaturesList({ featureTypes, list, setList }) {
  const handleFeatureList = useCallback((list, item, setList) => {
    if (list.includes(item)) {
      setList(list.filter((listItem) => listItem != item));
    } else {
      setList((prevState) => [...prevState, item]);
    }
  }, []);

  return (
    <View
      style={{
        marginTop: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}
    >
      <Divider />

      {featureTypes.map((feature) => (
        <Tag
          key={feature.key}
          content={feature.name}
          isSelected={list.includes(feature.name)}
          afterSelection={() => handleFeatureList(list, feature.name, setList)}
        />
      ))}
    </View>
  );
}
