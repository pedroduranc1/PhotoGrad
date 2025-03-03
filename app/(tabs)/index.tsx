import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// COMPONENTS
import Header from "@/components/header/header";
import { FlatList } from 'react-native';
import EscuelaCard from '@/components/card/Escuela.card';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { COLLECTIONS } from '@/constants/coleccions.fb';
import get from '@/api/Escuelas/get';
import EscuelaSkeleton from '@/components/skeleton/Escuela.skeleton';
import ErrorAlert from '@/components/alert/error.alert';
import useEscuelaStore from '@/store/useEscuelaStore';
import Swipeable from '@/components/swipeable/Swipeable';
import SafeArea from '@/components/safe-area/safeArea';
import Fab from '@/components/fab/Fab';
import { EscuelaInput } from '@/types/ValidationTypes';

const Index = () => {
  const [escuelasByName, setEscuelasByName] = useState<EscuelaInput[]>([]);

  const { data: EscuelasData, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: [COLLECTIONS.ESCUELAS],
    queryFn: get,
  });

  const Escuelas = useEscuelaStore((state) => state.escuelas);
  const setEscuelas = useEscuelaStore((state) => state.setEscuelas);

  useEffect(() => {
    if (isSuccess && EscuelasData) {
      setEscuelas(EscuelasData); // Guardar los datos en el store
      setEscuelasByName(EscuelasData); // Inicializar escuelasByName con los datos cargados
    }
  }, [isSuccess, EscuelasData, setEscuelas]);

  const router = useRouter();

  const handleSearchChange = (value: string) => {
    if (value.length > 0) {
      const filteredEscuelas = EscuelasData?.filter((escuela) =>
        escuela.nombre.toLowerCase().includes(value.toLowerCase()) // Filtra por nombre
      );
      setEscuelasByName(filteredEscuelas || []); // Actualiza el estado con los resultados filtrados
    } else {
      setEscuelasByName(EscuelasData || []); // Si no hay valor, muestra todos los datos
    }
  };

  return (
    <SafeArea swipeReload={refetch}>
      <View className="flex-1 relative web:mt-6 container mx-auto px-3">
        <Header Title="Escuelas" EnableSearch={true} onChange={handleSearchChange} />
        {isLoading && (
          <FlatList
            data={[1, 2, 3, 4, 5]} // Array de placeholders
            numColumns={1}
            renderItem={() => <EscuelaSkeleton />} // Mostrar el Skeleton
          />
        )}

        {isError && <ErrorAlert msg="Error al cargar las escuelas" />}

        {isSuccess && Escuelas && (
          <FlatList
            data={escuelasByName} // Usar escuelasByName como fuente de datos
            numColumns={1}
            renderItem={({ item }) => (
              <Swipeable id={item.id!!} rightThreshold={100}>
                <EscuelaCard data={item} className="w-full" />
              </Swipeable>
            )}
          />
        )}

        <Fab onPress={() => router.push('/escuela/add')}>
          <AntDesign
            name="pluscircle"
            size={Platform.OS === "ios" ? 48 : 42}
            color="#28d18d"
          />
        </Fab>
      </View>
    </SafeArea>
  );
};

export default Index;