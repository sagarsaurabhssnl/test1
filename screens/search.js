import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';

export default class search extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is search screen</Text>
                <Button onPress={() => {
                    Linking.canOpenURL("https://github.com/").then(supported => {
                        if (supported) {
                            return Linking.openURL("https://github.com/");
                        } else {
                            return Linking.openURL("https://www.facebook.com/");
                        }
                    })
                }} title="GOOGLE" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
