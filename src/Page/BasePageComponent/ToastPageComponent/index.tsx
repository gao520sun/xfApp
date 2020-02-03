import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import {NavigationPage, ListRow, Toast, Theme} from 'teaset';


const ToastPageComponent = () => {
    let customKey = null;
    const showToastView = (text:string = null) => {
        if (customKey) return;
        customKey = Toast.show({
          text: text || "正在加载中...",
          icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
          position: 'center',
          duration: 60000,
        });
      }
  const hideToastView = () => {
        if(!customKey) return;
        Toast.hide(customKey);
        customKey = null;
    }
  return { showToastView, hideToastView}
};

export default ToastPageComponent;

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
