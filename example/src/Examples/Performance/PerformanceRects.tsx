import type {SkRect} from '@shopify/react-native-skia';
import {Group, Rect, useComputedValue} from '@shopify/react-native-skia';
import React, {useMemo, useState} from 'react';
import {Button, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import type {SharedValue} from 'react-native-reanimated';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

const Size = 25;
const Increaser = 50;

export const PerformanceDrawingTest: React.FC = () => {
    const [numberOfBoxes, setNumberOfBoxes] = useState(100);

    const {width, height} = useWindowDimensions();

    const SizeWidth = Size;
    const SizeHeight = Size * 0.45;

    const pos = useSharedValue<{x: number; y: number}>({
        x: width / 2,
        y: height * 0.25,
    });

    const rects = useMemo(
        () =>
            [...Array(numberOfBoxes).keys()].map((i) => ({
                x: 5 + ((i * Size) % width),
                y: 25 + Math.floor(i / (width / Size)) * Size,
                width: SizeWidth,
                height: SizeHeight,
            })),
        [numberOfBoxes, width, SizeWidth, SizeHeight],
    );

    const gesture = Gesture.Pan().onChange(({x, y}) => (pos.value = {x, y}));

    return (
        <View style={styles.container}>
            <View style={styles.mode}>
                <View style={styles.panel}>
                    <Button
                        title="⬇️"
                        onPress={() => setNumberOfBoxes((n) => Math.max(0, n - Increaser))}
                    />
                    <Text style={{color: 'black'}}>{numberOfBoxes}</Text>
                    <Button title="⬆️" onPress={() => setNumberOfBoxes((n) => n + Increaser)} />
                </View>
            </View>

            <View style={{flex: 1}}>
                {/* <Canvas style={styles.container} pointerEvents="none">
                    {rects.map((_, i) => (
                        <Rct pos={pos} key={i} rct={rects[i]} />
                    ))}
                </Canvas> */}

                <GestureDetector gesture={gesture}>
                    <Animated.View style={StyleSheet.absoluteFill}>
                        {rects.map((_, i) => (
                            <RctView pos={pos} key={i} rct={rects[i]} />
                        ))}
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    );
};

interface RctProps {
    pos: SharedValue<{x: number; y: number}>;
    rct: SkRect;
}

const RctView = React.forwardRef<Animated.View, RctProps>(({pos, rct}, ref) => {
    console.log('render RctView');

    const transform = useAnimatedStyle(() => {
        const p1 = {x: rct.x, y: rct.y};
        const p2 = pos.value;
        const r = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        return {transform: [{rotate: r + 'rad'}]};
    }, []);

    return (
        <Animated.View
            ref={ref}
            style={[
                {
                    position: 'absolute',
                    left: rct.x,
                    top: rct.y,
                    width: rct.width,
                    height: rct.height,
                    backgroundColor: '#00ff00',
                    borderWidth: 1,
                    borderColor: '#4060A3',
                },
                transform,
            ]}
        />
    );
});

const Rct = ({pos, rct}: RctProps) => {
    console.log('render Rct');

    const transform = useComputedValue(() => {
        const p1 = {x: rct.x, y: rct.y};
        const p2 = pos.current;
        const r = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        return [{rotate: r}];
    }, [pos]);
    return (
        <Group transform={transform} origin={rct}>
            <Rect rect={rct} color="#00ff00" />
            <Rect rect={rct} color="#4060A3" style="stroke" strokeWidth={2} />
        </Group>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mode: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    panel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
