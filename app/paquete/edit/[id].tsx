import { View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import usePaqueteStore from '@/store/usePaqueteStore'
import AntDesign from '@expo/vector-icons/AntDesign'
import PaquetesForm from '@/components/form/paquetes.form'

const Edit = () => {

    const { id } = useLocalSearchParams<any>()
    const router = useRouter();

    const paquete = usePaqueteStore((state) => state.paquetes.find(paquete => paquete.id === id))

    return (
        <View className='mt-5 px-1 relative gap-3'>
            <View className='web:w-[40%] web:mx-auto h-full  p-3'>
                <View className='absolute hidden web:block top-3 right-3'>
                    <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
                </View>
                <PaquetesForm title='Agregar Paquete' data={paquete} />
            </View>
        </View>
    )
}

export default Edit