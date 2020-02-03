import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

interface ActivityIndicatorComponentProps {}

const ActivityIndicatorComponent = (props: ActivityIndicatorComponentProps) => {
  return (
    <View style={styles.container}>
        <ActivityIndicator
            animating={true}
            color='gray'
            size="small"
        />
    </View>
  );
};

export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
