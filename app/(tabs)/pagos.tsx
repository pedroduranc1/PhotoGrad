import { View } from 'react-native'
import React from 'react'
import SafeArea from '@/components/safe-area/safeArea'
import Header from "@/components/header/index"
import TopTabs from '@/components/tabs/TopTabs'


const pagos = () => {
  return (
    <SafeArea>
      <View className='flex-1 web:mt-6 container mx-auto px-3'>
        <Header Title='Pagos' />
        <TopTabs/>
      </View>
    </SafeArea>
  )
}

export default pagos