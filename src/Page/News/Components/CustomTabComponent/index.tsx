
import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface CustomTabComponentProps {
  tabs:any,
  goToPage?: any,
  renderTab?: any,
  activeTab?: number,
  activeTextColor? :any,
  inactiveTextColor? :any,
  textStyle? :any,
  tabStyle? :any,
}

const CustomTabComponent = (props: CustomTabComponentProps) => {

  const _renderTab = (name, page, isTabActive, onPressHandler) =>{
    const { activeTextColor, inactiveTextColor, textStyle, } = props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <TouchableOpacity
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style = {styles.scrollViewTabs} showsHorizontalScrollIndicator = {false}>
        {props.tabs.map((name, page) => {
            const isTabActive = props.activeTab === page;
            const renderTab = props.renderTab || _renderTab
            return renderTab(name, page, isTabActive, props.goToPage);
          })}
      </ScrollView>
    </View>
  );
};

export default CustomTabComponent;

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor:'#e8e8e8',
      borderBottomWidth:0.5,
  },
  tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
  },
  scrollViewTabs: {
    height: 50,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});