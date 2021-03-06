import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import CustomText from './Text';
import UserAvatar from './UserAvatar';
import { theme } from '../theme';
import { dynamicTime } from '../helpers/TimeHelper';
import { findLastMessage, getUnreadCount } from '../helpers';

const propTypes = {
  readStatus: PropTypes.number,
  name: PropTypes.string,
  onSelectConversation: PropTypes.func,
  item: PropTypes.shape({
    meta: PropTypes.shape({
      sender: {
        name: PropTypes.string,
        thumbnail: PropTypes.string,
      },
    }),
    messages: PropTypes.shape([]),
  }).isRequired,
};

class ConversationItem extends Component {
  render() {
    const { item, onSelectConversation } = this.props;
    const {
      meta: {
        sender: { name, thumbnail },
      },
      messages,
    } = item;

    const unread_count = getUnreadCount(item);

    const lastMessage = findLastMessage({ messages });
    const { content, created_at } = lastMessage;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.container}
        onPress={() => onSelectConversation(item)}>
        <View style={styles.itemView}>
          <View style={styles.avatarView}>
            <UserAvatar
              thumbnail={thumbnail}
              userName={name}
              defaultBGColor=""
            />
          </View>
          <View>
            <CustomText
              style={
                unread_count
                  ? styles.conversationUserActive
                  : styles.conversationUserNotActive
              }>
              {name}
            </CustomText>

            <CustomText
              style={
                unread_count ? styles.messageActive : styles.messageNotActive
              }
              numberOfLines={1}
              maxLength={8}>
              {content.length < 25
                ? `${content}`
                : `${content.substring(0, 25)}...`}
            </CustomText>
          </View>
        </View>
        <View>
          <View>
            <CustomText style={styles.timeStamp}>
              {dynamicTime({ time: created_at })}
            </CustomText>
          </View>
          {unread_count ? (
            <View style={styles.badgeView}>
              <View style={styles.badge}>
                <CustomText style={styles.badgeCount}>
                  {unread_count.toString()}
                </CustomText>
              </View>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: theme['color-white'],
    marginVertical: 0.5,
    borderColor: theme['color-border-light'],
    borderBottomWidth: 1,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationUserActive: {
    textTransform: 'capitalize',
    fontSize: theme['font-size-medium'],
    color: theme['text-active-color'],
    fontWeight: theme['font-medium'],
    paddingTop: 4,
  },
  conversationUserNotActive: {
    textTransform: 'capitalize',
    fontSize: theme['font-size-medium'],
    color: theme['color-body'],
    paddingTop: 4,
  },
  avatarView: {
    justifyContent: 'flex-end',
    marginRight: 16,
  },
  userActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 2,
    right: 2,
  },
  messageActive: {
    fontSize: theme['text-primary-size'],
    color: theme['text-active-color'],
    fontWeight: theme['font-medium'],
    paddingTop: 4,
  },
  messageNotActive: {
    fontSize: theme['text-primary-size'],
    color: theme['color-body'],
    paddingTop: 4,
  },
  timeStamp: {
    color: theme['text-primary-color'],
    fontSize: theme['font-size-extra-extra-small'],
    fontWeight: theme['font-regular'],
  },
  badgeView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: theme['color-success'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCount: {
    color: theme['color-white'],
    fontSize: theme['font-size-extra-extra-small'],
  },
});

ConversationItem.propTypes = propTypes;

export default ConversationItem;
