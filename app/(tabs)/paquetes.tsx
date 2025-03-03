import { FlatList, Platform, View } from 'react-native'
import React, { useEffect } from 'react'
import SafeArea from '@/components/safe-area/safeArea'
import Header from "@/components/header/header"
import Fab from '@/components/fab/index'
import { useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useQuery } from '@tanstack/react-query'
import { COLLECTIONS } from '@/constants/coleccions.fb'
import get from "@/api/Paquetes/get";
import ErrorAlert from '@/components/alert/error.alert'
import EscuelaSkeleton from '@/components/skeleton/Escuela.skeleton'
import PaqueteCard from '@/components/card/Paquete/index'
import usePaqueteStore from '@/store/usePaqueteStore'
import ModalPaquete from '~/components/modal/Modal.paquete'

const paquetes = () => {
  const router = useRouter()

  const { data: PaquetesData, isLoading, isError, refetch, isSuccess } = useQuery({
    queryKey: [COLLECTIONS.PAQUETES],
    queryFn: get
  })

  const setPaquetes = usePaqueteStore((state) => state.setPaquetes)
  const paquetes = usePaqueteStore((state) => state.paquetes)

  useEffect(() => {
    if (isSuccess) {
      setPaquetes(PaquetesData); // Guardar los estudiantes en el store
    }
  }, [isSuccess, PaquetesData, setPaquetes]);

  return (
    <SafeArea swipeReload={refetch}>
      <View className='flex-1 web:mt-6 container mx-auto px-3'>
        <Header Title='Paquetes' onChange={() => { }} />

        {isLoading && (
          <FlatList
            data={[1, 2, 3, 4, 5]} // Array de placeholders
            numColumns={1}
            renderItem={() => <EscuelaSkeleton />} // Mostrar el Skeleton
          />
        )}

        {isError && <ErrorAlert msg="Error al cargar los paquetes" />}

        {isSuccess && paquetes && (
          <FlatList
            data={paquetes} // Usar escuelasByName como fuente de datos
            numColumns={1}
            renderItem={({ item }) => (
              <PaqueteCard item={item} />
            )}
          />
        )}


      </View>
    </SafeArea>
  )
}

export default paquetes