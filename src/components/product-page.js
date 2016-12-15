/**
 * Created by ggoma on 12/15/16.
 */
import React, {Component} from 'react';
import {
    Animated,
    View,
    Dimensions,
    Text,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class ProductPage extends Component {
    state = {
        rotated: false,
        rotate: new Animated.Value(0),
        title: 'COOL TITLE HERE',
        descOpacity: new Animated.Value(1),
        picture: 1,
        opacity: 1,
    };

    componentDidMount() {
        setTimeout(() => {
            this.measureCard();
        }, 0);
    }

    measureCard() {
        console.log(this.refs);
        this.refs.card.measure((ox, oy, width, height, px, py) => {
            console.log(px, py);
            this.setState({px, py});
        });
    }

    flip() {
        if(!this.state.rotated) {
            Animated.timing(
                this.state.rotate,
                {
                    toValue: 1,
                    duration: 600
                }
            ).start();
        } else {
            Animated.timing(
                this.state.rotate,
                {
                    toValue: 0,
                    duration: 600
                }
            ).start();
        }
        this.setState({rotated: !this.state.rotated});
        Animated.timing(
            this.state.descOpacity,
            {
                toValue: 0,
                duration: 300
            }
        ).start(() => {
            Animated.timing(
                this.state.descOpacity,
                {
                    toValue: 1,
                    duration: 300
                }
            ).start();
        });
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <View style={{height: 80, width: 80, backgroundColor: '#FE5A49', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontWeight: '800', color: 'white', fontSize: 42,}}>:)</Text>
                </View>
            </View>
        )
    }

    renderBody() {
        return (
            <View style={styles.body}>
                <View style={styles.cardContainer}>
                    {this.renderCard()}
                </View>
            </View>
        )
    }

    getCardStyle() {
        return {transform: [{rotateY: this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [ '0deg', '180deg' ]
        })}]}
    }

    getImage1Style() {
        return {opacity: this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [ 1, 0 ],
        }),
            transform:
                [
                    {
                        translateX: this.state.rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [ 0, -100 ]
                    })},
                    {
                        translateY: this.state.rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [ 0, 20 ]
                        })},
                ]
        }
    }

    getImage2Style() {
        return {opacity: this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [ 0, 1 ],
        }),
            transform:
                [
                    {
                        translateX: this.state.rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [ width, 0 ]
                        })},
                    {
                        translateY: this.state.rotate.interpolate({
                            inputRange: [0, 1],
                            outputRange: [ 20, 0 ]
                        })},
                ]
        }
    }

    renderCard() {
        return (
            <View>
                <Animated.View style={[styles.card, this.getCardStyle()]}>
                    <View ref='card'/>
                </Animated.View>

                <View style={{width: 200, paddingTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => {this.flip()}}>
                        <Text style={{fontSize: 12, fontWeight: '800'}}>PREV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.flip()}}>
                        <Text style={{fontSize: 12, fontWeight: '800'}}>NEXT</Text>
                    </TouchableOpacity>
                </View>

                <View style={{borderBottomWidth: 2, width: 260, marginTop: 40}}/>
            </View>
        )
    }

    renderImage1() {
        const {px, py} = this.state;
        return (
            <Animated.Image source={require('../../assets/images/1.jpg')} style={[styles.img, this.getImage1Style(), {left: px + 20, top: py - 30}]}/>
        )
    }

    renderImage2() {
        const {px, py} = this.state;
        return (
            <Animated.Image source={require('../../assets/images/2.jpg')} style={[styles.img, this.getImage2Style(), {left: px + 20, top: py - 30}]}/>
        )
    }

    renderCart() {
        return (
            <View style={styles.cart}>
                <Text style={{fontSize: 24, fontWeight: '800'}}>IN CART</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20}}>
                    <View style={{width: 150, height: 100, backgroundColor: 'white'}}>
                        <Image source={require('../../assets/images/2.jpg')} style={{height: 120, width: 130}}/>
                    </View>
                    <View style={{width: 150, height: 100, backgroundColor: 'white'}}>
                        <Image source={require('../../assets/images/1.jpg')} style={{height: 120, width: 130}}/>
                    </View>

                </View>

            </View>
        )
    }

    renderDescription() {
        const {px, py, descOpacity, title} = this.state;
        return (
            <Animated.View style={[styles.description, {opacity: descOpacity, left: px, top: py}]}>
                <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>{title}</Text>
                <Text style={{fontSize: 12, fontWeight: '700', color: 'gray'}}>SUPPLIED BY: ggoma</Text>
                <Text style={{fontSize: 24, fontWeight: '900', color: 'black', paddingTop: 10}}>345 <Text style={{fontSize: 14}}>USD</Text></Text>
                <Text style={{paddingTop: 20, fontWeight: '200'}}>New York</Text>
                <Text style={{paddingTop: 10, fontWeight: '200'}}>Delievered by ggoma</Text>
            </Animated.View>
        )
    }

    design() {
        return (
            <View style={styles.goods}>
                <Text numberOfLines={1} style={{fontSize: 16, fontWeight: '800', transform: [{rotate: '270deg'}]}}>T H E  G O O D S    _______________________________</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'default'}/>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderCart()}
                {this.renderDescription()}
                {this.renderImage1()}
                {this.renderImage2()}
                {this.design()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2D944'
    },
    header: {
        height: 100,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomColor: '#FE5A49',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    body: {
        flex: 10,
        flexDirection: 'row',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24
    },
    card: {
        height: 250,
        width: 200,
        backgroundColor: 'white',
    },
    cart: {
        flex: 2,
        padding: 24,
        paddingTop: 0,
    },
    description: {
        height: 250,
        width: 200,
        backgroundColor: 'transparent',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingTop: 80,
        left: 0,
        top: 0
    },
    goods: {
        position: 'absolute',
        left: 150,
        bottom: 350,
    },
    img: {
        height: 160 * 2/3,
        width: 160,
        position: 'absolute',
        left: 0,
        top: 0,
    }
})