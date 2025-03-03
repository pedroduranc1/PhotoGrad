import { View, FlatList } from 'react-native'
import React from 'react'
import { H2 } from '@/components/ui/typography'
import { FakeDataEscuela, FakeDataEstudiantes } from '@/constants/Fakedata';
import { Separator } from '~/components/ui/separator';

//COMPONENTS
import Header from "@/components/header/header";
import EscuelaCard from '@/components/card/Escuela.card';
import SafeArea from '@/components/safe-area/safeArea';
import EstudianteCard from '@/components/card/Estudiante.card';
import get from '@/api/Estudiante/get';
import getEscuelas from '@/api/Escuelas/get';
import { COLLECTIONS } from '@/constants/coleccions.fb';
import { useQueries, useQuery } from '@tanstack/react-query';

const inicio = () => {

  const { data: EstudiantesArray } = useQuery({
    queryKey: [COLLECTIONS.ESTUDIANTES],
    queryFn: get
  })
  const { data: EscuelasArray } = useQuery({
    queryKey: [COLLECTIONS.ESCUELAS],
    queryFn: getEscuelas
  })

  return (
    <SafeArea>
      <View
        className='flex-1 web:mt-6 container mx-auto px-3'>
        {/* Header */}
        <Header Title='Inicio' EnableSearch={false} onChange={()=>{}} />

        <H2 className='pt-5'>Escuelas</H2>
        <View className='w-full h-32 mt-5'>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            className='flex-row h-full '
            data={EscuelasArray}
            renderItem={({ item }) =>
            (
              <EscuelaCard data={item} className='w-[60vw] web:w-fit mr-2' />
            )}
          />
        </View>
        <Separator className='mt-3' orientation='horizontal' />

        <H2 className='pt-10'>Estudiantes Agregados</H2>
        <View className='w-full h-32 mt-5'>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            className='flex-row h-full '
            data={EstudiantesArray}
            renderItem={({ item }) =>
            (
              <EstudianteCard
                item={item}
              />
            )}
          />
        </View>
        <Separator className='mt-3' orientation='horizontal' />
      </View>
    </SafeArea>

  )
}

export default inicio