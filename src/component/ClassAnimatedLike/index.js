import React, { Component } from 'react';
import { Image, Dimensions, Animated } from 'react-native'
import io from "socket.io-client";
// import Animated from 'react-native-reanimated'
import Hearth from '../../assets/hearths.png'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const socket = io("http://radiocampusapi.com.br");

export default class LikeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }
    componentDidMount() {
        socket.on('likesend', () => {
            console.log('like')
            this.fadeIn();
            // onViewHearthVisible()
        });
    }

    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start(() => {
            this.fadeOut()
        });
    };

    fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 900,
            useNativeDriver: false
        }).start();
    };

    render() {
        return (
            <Animated.Image style={{
                position: "absolute", left: (width / 3.41) - ((width / 3) / 2), top: height - (width * 0.15) * 7, width: width * 0.14, height: width * 0.14, alignItems: 'center', justifyContent: 'center', opacity: this.state.fadeAnim, transform: [{
                    translateY: this.state.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [170, 0]
                    }),
                }],
            }} source={Hearth} resizeMode='contain' />
        );
    }

}