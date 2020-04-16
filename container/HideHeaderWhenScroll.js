import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const NAVBAR_HEIGHT = 100;

export default class Home extends PureComponent {

  constructor(props) {
    super(props);

    const scrollAnim = new Animated.Value(0);
    this.state = ({
      scrollAnim,
    });

  }


  renderItem = (item, key) => {
    return (<View key={key} height={100} margin={10} backgroundColor={'#ccf2ff'} borderRadius={5} />);
  }

  renderTabbar = () => {
    const { scrollAnim } = this.state;

    const navbarTranslate = scrollAnim.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (<Animated.View style={[styles.viewTabbar, { opacity: navbarTranslate}]} />);
  }

  render() {

    return (
      <SafeAreaView flex={1}>
        <View flex={1} backgroundColor={'white'}>
          <Animated.ScrollView
            ref={ref => (this._scrollView = ref)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
              {
                listener: () => {
                  //
                },
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={16}
          >
            {[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(this.renderItem)}

          </Animated.ScrollView>
        </View>
        {this.renderTabbar()}
      </SafeAreaView>
    );

  }
}

const styles = StyleSheet.create({
  viewTabbar: {
    height: 50,
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundColor: '#ffe0cc',
  },
});