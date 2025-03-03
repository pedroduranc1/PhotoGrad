import { View , Easing,  } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Fontisto from '@expo/vector-icons/Fontisto'
import { H3, P } from '@/components/ui/typography'
import Reanimated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
interface Props {
    data: any,
    className:string
}

const EscuelaCard = ({ data,className }: Props) => {
    //ANIMATION
    const heightAni = useSharedValue(70);
    const opacityAni = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: heightAni.value,
            opacity: opacityAni.value
        }
    });

    const animationDelete = async () => {
        heightAni.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });
        opacityAni.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) });

        await new Promise((resolve) => setTimeout(resolve, 300));
    }

    return (
        <Reanimated.View className={`${className} bg-white pl-2 py-2 h-fit min-h-32`}>
            <View>
                <View className='flex flex-row gap-x-4 items-start'>
                    <FontAwesome6 size={24} name="school" color={"#000000"} />
                    <H3>{data.nombre}</H3>
                </View>
                <View className='mt-3 flex-row justify-between'>
                    <View className='flex-row gap-2 items-center'>
                        <Fontisto size={14} name="person" color={"#000000"} />
                        <P>{data.estudiantes}</P>
                    </View>
                    <View className='flex-row gap-2 items-center'>
                        <FontAwesome6 name="door-open" size={14} color="black" />
                        <P>{data.secciones}</P>
                    </View>
                </View>
                <P className='mt-auto text-gray-400'>{data.periodo}</P>
            </View>
        </Reanimated.View>

    )
}

export default EscuelaCard