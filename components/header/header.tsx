import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { H1 } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { LogBox } from 'react-native';

// Ignorar el error específico
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component.']);

interface Props {
  Title: string;
  EnableSearch?: boolean;
  onChange: (value:string) => void;
}

const Index = ({ Title, EnableSearch,onChange }: Props) => {
  const [IsSearchOpen, setIsSearchOpen] = useState(false);
  const width = useSharedValue(0); // Inicialmente, el ancho es 0

  const handleOpenSearch = () => {
    setIsSearchOpen(!IsSearchOpen);
    onChange("")
    width.value = withTiming(IsSearchOpen ? 0 : 200, { duration: 300 }); // Animamos el ancho a 200 o de vuelta a 0
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value, // Aplicamos el ancho animado
      opacity: width.value > 0 ? 1 : 0, // Opcional: animar la opacidad para un efecto más suave
    };
  });

  return (
    <View className='flex-row justify-between items-center'>
      <H1>{Title}</H1>

      {
        EnableSearch && (
          <>
            {IsSearchOpen ? (
              <Animated.View
                className='h-14 pl-2 overflow-hidden items-center rounded-md justify-end border-[1px] border-gray-300 flex-row'
                style={animatedStyle} // Aplicamos el estilo animado aquí
              >
                <Input className='border-0 flex-1' onChangeText={(e) => onChange(e)!!} />
                <AntDesign onPress={handleOpenSearch} name="close" size={24} color="black" />
              </Animated.View>
            ) : (
              <Animated.View
                className='h-14 pl-5 overflow-hidden items-center rounded-md justify-end bg-white flex-row'
              // Aplicamos el estilo animado aquí
              >
                <TouchableOpacity className='h-14 justify-center  flex items-center' onPress={handleOpenSearch}>
                  <EvilIcons name="search" size={32} color="black" />
                </TouchableOpacity>
              </Animated.View>
            )}
          </>
        )
      }

    </View>
  );
};

export default Index;