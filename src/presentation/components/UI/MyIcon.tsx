import {Icon, useTheme} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
  size?: number;
  onPress?: () => void;
}

export const MyIcon = ({
  name,
  color,
  white = false,
  size = 32,
  onPress,
}: Props) => {
  const theme = useTheme();

  let finalColor = color;

  if (white) {
    finalColor = theme['color-info-100'];
  } else if (!color) {
    finalColor = theme['text-basic-color'];
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Icon
        style={[styles.icon, {width: size, height: size}]}
        fill={finalColor}
        name={name}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
