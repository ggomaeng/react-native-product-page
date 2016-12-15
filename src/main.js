/**
 * Created by ggoma on 12/15/16.
 */

import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native'
import ProductPage from './components/product-page';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ProductPage/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});