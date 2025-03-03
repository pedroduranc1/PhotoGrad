import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useRouter } from 'expo-router';

interface Props {
    id: string,
    children: React.ReactNode;
    rightThreshold?: number;
}

const Swipeable = ({id,children,rightThreshold}:Props) => {
    const reanimatedSwipeableRef = useRef<SwipeableMethods>(null);
    const router = useRouter();

    return (
        <ReanimatedSwipeable
            ref={reanimatedSwipeableRef}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={rightThreshold}
            renderRightActions={() => (
                <View className='flex-row rounded-md overflow-hidden'>
                    <TouchableOpacity onPress={() => router.push(`/escuela/edit/${id}`)}>
                        <View className='bg-gray-500 w-24 h-full justify-center items-center flex-center'>
                            <Text className='text-white text-lg font-bold'>Modificar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push(`/escuela/delete/${id}`)}>
                        <View className='bg-red-500 w-24 h-full justify-center items-center flex-center'>
                            <Text className='text-white text-lg font-bold'>Eliminar</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )}
        >
            {children}
        </ReanimatedSwipeable>
    )
}

export default Swipeable