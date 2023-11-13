import {
    Canvas,
    Fill,
    Group,
    Rect,
    TouchHandler,
    useClock,
    useClockValue,
    useComputedValue,
    useValue,
    vec,
} from '@shopify/react-native-skia';
import {useAnimatedReaction} from '@shopify/react-native-skia/src/external/reanimated/moduleWrapper';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
    makeMutable,
    runOnUI,
    useAnimatedStyle,
    useDerivedValue,
    useFrameCallback,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const c1 = '#F00';
const c2 = '#00F';

const ClockBreathe = () => {
    const loop = useSharedValue(0);
    const temp = useSharedValue('#FFF');
    const color = useDerivedValue(() => {
        temp.value = temp.value === c1 ? c2 : c1;
        return temp.value;
    });

    useEffect(() => {
        loop.value = withRepeat(withTiming(1, {duration: 1000}), undefined, true);
    }, []);

    return (
        <Canvas style={{flex: 1}} debug mode="continuous">
            <Fill color={color} />
        </Canvas>
    );
};

const Clock2Breathe = () => {
    const color = useSharedValue('#FFF');
    const clock = useFrameCallback(() => {
        color.value = color.value === c1 ? c2 : c1;
    });

    useEffect(() => {
        return () => clock.setActive(false);
    }, []);

    return (
        <Canvas style={{flex: 1}} debug>
            <Fill color={color} />
        </Canvas>
    );
};

const Breathe00 = () => {
    const colorVal = useSharedValue('#FFF');
    useEffect(() => {
        let animating = true;
        runOnUI(() => {
            let f = 0;
            const animate = () => {
                if (animating) requestAnimationFrame(animate);
                colorVal.value = ++f % 2 ? c1 : c2;
                console.log('FRAME', performance.now());
            };
            requestAnimationFrame(animate);
        })();
        return () => {
            animating = false;
        };
    }, []);
    return (
        <Canvas style={{flex: 1}}>
            <Fill color={colorVal} />
        </Canvas>
    );
};

const Breathe01 = () => {
    const colorVal = useSharedValue('#FFF');
    useEffect(() => {
        let animating = makeMutable(true);
        let f = 0;
        const animate = () => {
            if (animating.value) requestAnimationFrame(animate);
            colorVal.value = f % 2 === 0 ? c1 : c2;
            console.log('FRAME', performance.now());
        };
        requestAnimationFrame(animate);
        return () => {
            animating.value = false;
        };
    }, []);
    return (
        <Canvas style={{flex: 1}} mode="continuous">
            <Fill color={colorVal} />
        </Canvas>
    );
};

const Breathe02 = () => {
    const colorVal = useSharedValue('#FFF');
    useEffect(() => {
        let animating = makeMutable(true);
        runOnUI(() => {
            let f = 0;
            const animate = () => {
                if (animating.value) requestAnimationFrame(animate);
                colorVal.value = f % 2 === 0 ? c1 : c2;
                f = (f + 1) % Number.MAX_SAFE_INTEGER;
            };
            requestAnimationFrame(animate);
        })();
        return () => {
            animating.value = false;
        };
    }, []);
    return (
        <Canvas style={{flex: 1}}>
            <Fill color={colorVal} />
        </Canvas>
    );
};

const Breathe03 = () => {
    const colorVal = useSharedValue('#FFF');

    useEffect(() => {
        let animating = true;
        runOnUI(() => {
            let f = 0;
            const animate = () => {
                if (animating) requestAnimationFrame(animate);
                colorVal.value = f % 2 === 0 ? c1 : c2;
                f = (f + 1) % Number.MAX_SAFE_INTEGER;
            };
            requestAnimationFrame(animate);
        })();
        return () => {
            animating = false;
        };
    }, [colorVal]);

    const style = useAnimatedStyle(() => {
        return {
            backgroundColor: colorVal.value,
        };
    });
    return (
        <Animated.View style={[style, {flex: 1}]}>
            {/* <Canvas style={{flex: 1}}>
                <Fill color={colorVal} />
            </Canvas> */}
        </Animated.View>
    );
};

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

const Breathe04 = () => {
    const colorVal = useSharedValue('#FFF');

    useEffect(() => {
        let animating = makeMutable(true);
        runOnUI(() => {
            let f = 0;
            const animate = (_now: number) => {
                if (animating.value) requestAnimationFrame(animate);
                colorVal.value = f % 2 === 0 ? c1 : c2;
                f = (f + 1) % Number.MAX_SAFE_INTEGER;
            };
            requestAnimationFrame(animate);
        })();
        return () => {
            animating.value = false;
        };
    }, [colorVal]);

    const style = useAnimatedStyle(() => {
        return {
            backgroundColor: colorVal.value,
        };
    });
    return (
        <AnimatedCanvas style={[{flex: 1}, style]}>
            <Rect x={0} y={0} width={256} height={256} color={colorVal} />
        </AnimatedCanvas>
    );
};

const Breathe05 = () => {
    const loop = useClockValue();
    const color = useComputedValue((): string => {
        return color?.current === c1 ? c2 : c1;
    }, [loop]);

    return (
        <Canvas style={{flex: 1}}>
            <Fill color={color} />
        </Canvas>
    );
};

const Breathe06 = () => {
    const loop = useClockValue();

    const color = useComputedValue((): string => {
        return color?.current === c1 ? c2 : c1;
    }, [loop]);

    const touches = useValue<{id: number; x: number; y: number}[]>([]);

    const rotTx = useComputedValue(() => {
        const x = touches.current[0]?.x ?? 0;
        const y = touches.current[0]?.y ?? 0;
        return [
            {translateX: x - 128},
            {translateY: y - 128},
            {rotate: ((loop?.current ?? 0) / 700) % (2 * Math.PI)},
        ];
    }, [loop, touches]);

    const handleTouch: TouchHandler = React.useCallback((t) => {
        touches.current = t[0];
    }, []);

    return (
        <Canvas style={{flex: 1}} onTouch={handleTouch} mode="continuous">
            <Group transform={rotTx} origin={vec(128, 128)}>
                <Rect x={0} y={0} width={256} height={256} color={color} />
            </Group>
        </Canvas>
    );
};

const halfSize = 128;
const origin = vec(halfSize, halfSize);

const Breathe07 = () => {
    const frame = useSharedValue(0);
    const color = useSharedValue('#FFF');
    const rotTx = useSharedValue([]);
    useFrameCallback(() => {
        frame._value = (frame._value + 1) % Number.MAX_SAFE_INTEGER;
    });

    useAnimatedReaction(
        () => frame.value,
        () => {
            color._value = frame._value % 2 === 0 ? c2 : c1;
            rotTx._value = [{rotate: frame._value / 100}];
        },
    );

    const touches = useSharedValue<{id: number; x: number; y: number}[]>([]);

    const translateTx = useDerivedValue(() => {
        const x = touches.value[0]?.x ?? 0;
        const y = touches.value[0]?.y ?? 0;
        return [{translateX: x - halfSize}, {translateY: y - halfSize}];
    });

    const gesture = Gesture.Pan().onUpdate((state) => {
        touches.value = [{id: 0, x: state.x, y: state.y}];
    });

    return (
        <GestureDetector gesture={gesture}>
            <Canvas style={{flex: 1}}>
                <Group transform={translateTx}>
                    <Group transform={rotTx} origin={origin}>
                        <Rect
                            x={0}
                            y={0}
                            width={halfSize * 2}
                            height={halfSize * 2}
                            color={color}
                        />
                    </Group>
                </Group>
            </Canvas>
        </GestureDetector>
    );
};

const Breathe08 = () => {
    const frame = useSharedValue(0);
    const color = useSharedValue('#FFF');
    const rotTx = useSharedValue([]);
    useFrameCallback(() => {
        frame._value = (frame._value + 1) % Number.MAX_SAFE_INTEGER;
    });

    useAnimatedReaction(
        () => frame.value,
        () => {
            color._value = frame._value % 2 === 0 ? c2 : c1;
            rotTx._value = [{rotate: frame._value / 100}];
        },
    );

    const touches = useSharedValue<{id: number; x: number; y: number}[]>([]);

    const translateTx = useDerivedValue(() => {
        const x = touches.value[0]?.x ?? 0;
        const y = touches.value[0]?.y ?? 0;
        return [{translateX: x - halfSize}, {translateY: y - halfSize}];
    });

    const gesture = Gesture.Pan().onUpdate((state) => {
        touches.value = [{id: 0, x: state.x, y: state.y}];
    });

    return (
        <GestureDetector gesture={gesture}>
            <Canvas style={{flex: 1}} mode="continuous">
                <Group transform={translateTx}>
                    <Group transform={rotTx} origin={origin}>
                        <Rect
                            x={0}
                            y={0}
                            width={halfSize * 2}
                            height={halfSize * 2}
                            color={color}
                        />
                    </Group>
                </Group>
            </Canvas>
        </GestureDetector>
    );
};

export const Breathe = Breathe07;
