import { View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'
import PaquetesForm from '../../components/form/paquetes.form'

const add = () => {

    const router = useRouter();

  return (
    <View className='mt-5 px-1 relative gap-3'>
      <View className='web:w-[40%] web:mx-auto h-full  p-3'>
        <View className='absolute hidden web:block top-3 right-3'>
          <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
        </View>
        <PaquetesForm title='Agregar Paquete'/>
      </View>
    </View>
  )
}

export default add