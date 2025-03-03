import { View } from 'react-native'
import React from 'react'
import EscuelaForm from '../../components/form/escuela.form'
import { H3 } from '@/components/ui/typography'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'

const add = () => {
    const router = useRouter();
    return (
        <View className='mt-5 px-3 relative gap-3'>
            <View className='web:w-[40%] web:mx-auto h-full  p-3'>
                <View className='absolute hidden web:block top-3 right-3'>
                    <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
                </View>
                <H3 className='my-3 font-bold text-center'>Agregar Escuela</H3>
                <EscuelaForm />
            </View>

        </View>
    )
}

export default add