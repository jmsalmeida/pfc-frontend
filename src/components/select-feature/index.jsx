import { View } from 'react-native';
import { Text, CheckBox, Card } from '@ui-kitten/components';
import { styles } from '../../components/party-place-card/styles';

export function SelectFeature({
  isSelected,
  setIsSelected,
  title,
  content,
  checkboxText,
  children,
}) {
  return (
    <View>
      <CheckBox
        style={{ paddingVertical: 10 }}
        checked={isSelected}
        onChange={(isCheked) => setIsSelected(isCheked)}
      >
        {checkboxText}
      </CheckBox>

      <Card
        style={[styles.card, { flex: 1, alignItems: 'center' }]}
        onPress={() => setIsSelected(!isSelected)}
      >
        <View style={{ flex: 1, alignItems: 'center', opacity: isSelected ? 1 : 0.1 }}>
          <Text category="h6">{title}</Text>
          <Text category="s2">{content}</Text>
          {children}
        </View>
      </Card>
    </View>
  );
}
