import React from 'react';
import { Pressable, Text, View, StyleSheet, ActivityIndicator } from 'react-native';

type Variant = 'primary' | 'secondary' | 'neutral' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

export interface RNButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
}

const brand = {
  yellow500: '#FBC314',
  yellow600: '#EFAF13',
  orange500: '#DD5E23',
  orange600: '#C76A18',
  blue500: '#0081C5',
  black: '#111111',
  white: '#FFFFFF',
};

const sizeMap = {
  sm: { padV: 10, padH: 16, radius: 18, font: 14 },
  md: { padV: 12, padH: 20, radius: 22, font: 16 },
  lg: { padV: 14, padH: 24, radius: 28, font: 18 },
};

export const Button: React.FC<RNButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  size = 'md',
}) => {
  const s = sizeMap[size];

  const gradient =
    variant === 'primary'
      ? [brand.yellow500, brand.yellow600]
      : variant === 'secondary'
      ? [brand.orange500, brand.orange600]
      : variant === 'inverse'
      ? [brand.black, brand.black]
      : [brand.white, brand.white];

  const textColor = variant === 'inverse' ? brand.white : brand.black;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          paddingVertical: s.padV,
          paddingHorizontal: s.padH,
          borderRadius: s.radius,
          backgroundColor: gradient[0],
          opacity: pressed ? 0.9 : 1,
          borderWidth: variant === 'neutral' ? 1 : 0,
          borderColor: variant === 'neutral' ? '#E5E7EB' : 'transparent',
          shadowOpacity: 0.18,
        },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {loading && <ActivityIndicator color={textColor} />}
        <Text style={{ color: textColor, fontWeight: '700', fontSize: s.font }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;


