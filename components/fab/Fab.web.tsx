import { TouchableOpacity } from 'react-native'
import React from 'react'

interface Props{
    children: React.ReactNode,
    onPress?: () => void
}

const Fab = ({children,onPress}:Props) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    className={`ios:bottom-32 android:bottom-28 bottom-32 right-7 absolute`}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Fab