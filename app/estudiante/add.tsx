import React from 'react'
import EstudianteForm from '../../components/form/estudiante.form'
import { View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'

const add = () => {
  const router = useRouter()
  return (
    <View className='mt-5 px-3 relative gap-3'>
      <View className='web:w-[40%] web:mx-auto h-full  p-3'>
        <View className='absolute hidden web:block top-3 right-3'>
          <AntDesign name='close' size={24} color='#000' onPress={() => router.dismiss()} />
        </View>
        <EstudianteForm title='Agregar Estudiante' />

      </View>
    </View>

  )
}

export default add