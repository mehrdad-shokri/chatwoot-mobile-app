import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-ui-kitten';
import PropTypes from 'prop-types';

import CustomText from './Text';
import { getUserInitial, getRandomColor } from '../helpers';
import { theme } from '../theme';

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
  },
  userThumbNail: {
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: theme['color-primary'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: theme['color-white'],
    fontFamily: theme['font-family-bold'],
    fontWeight: theme['font-bold'],
    fontSize: theme['font-size-medium'],
  },
});

const propTypes = {
  thumbnail: PropTypes.string,
  userName: PropTypes.string,
  size: PropTypes.string,
  defaultBGColor: PropTypes.string,
};

const defaultProps = {
  thumbnail: null,
  userName: null,
  size: 'large',
  defaultBGColor: theme['color-primary'],
};

const UserAvatar = ({ thumbnail, userName, size, defaultBGColor }) =>
  thumbnail ? (
    <Avatar
      source={{
        uri: thumbnail,
      }}
      size={size}
      style={styles.avatar}
    />
  ) : (
    <View
      style={[
        styles.userThumbNail,
        { backgroundColor: defaultBGColor || getRandomColor({ userName }) },
      ]}>
      <CustomText style={styles.userName}>
        {getUserInitial({ userName })}
      </CustomText>
    </View>
  );

UserAvatar.defaultProps = defaultProps;
UserAvatar.propTypes = propTypes;

export default UserAvatar;
