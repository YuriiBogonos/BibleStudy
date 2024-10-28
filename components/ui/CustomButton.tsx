import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '@/types/Colors';

interface CustomButtonProps {
  Icon?: FC;
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  Icon,
  text,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.buttonFlex}>
        {Icon && <Icon />}
        <Text style={[styles.buttonText, disabled && styles.textDisabled]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.DarkBlue,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.DarkBlue + '80',
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDisabled: {
    opacity: 0.7,
  },
  buttonFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default CustomButton;
