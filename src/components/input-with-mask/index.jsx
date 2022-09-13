import React from 'react';
import { Input } from '@ui-kitten/components';
import { formatWithMask, Masks } from 'react-native-mask-input';

export function InputWithMask({ mask, onMask, ...inputAttrs }) {
  const [maskedValue, setMaskedValue] = React.useState('');

  const selectMask = (mask) => {
    switch (mask) {
      case 'cnpj':
        return Masks.BRL_CNPJ;
      case 'zipCode':
        return Masks.ZIP_CODE;
      case 'cellphone':
        return Masks.BRL_PHONE;
      default:
        throw 'Invalid mask';
    }
  };

  return (
    <Input
      {...inputAttrs}
      value={maskedValue}
      onChangeText={(nextValue) => {
        const { masked, unmasked } = formatWithMask({
          text: nextValue,
          mask: selectMask(mask),
        });

        onMask(unmasked);
        setMaskedValue(masked);
      }}
    />
  );
}
