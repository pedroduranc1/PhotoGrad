import { FlatList, View, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeArea from '@/components/safe-area/safeArea';
import Header from "@/components/header/header";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import useEscuelaStore from '@/store/useEscuelaStore';
import { H3, H4 } from '@/components/ui/typography';
import useEstudianteStore from '@/store/useEstudiantesStore';
import { EstudianteInput } from '@/types/ValidationTypes';
import { useQuery } from '@tanstack/react-query';
import { COLLECTIONS } from '@/constants/coleccions.fb';
import get from '@/api/Estudiante/get';
import EstudianteCard from '@/components/card/Estudiante.card';
import Fab from '@/components/fab/Fab';

const Explore = () => {
  const router = useRouter();
  const Escuelas = useEscuelaStore((state) => state.escuelas);
  const { data: EstudiantesArray, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: [COLLECTIONS.ESTUDIANTES],
    queryFn: get,
  });

  const Estudiantes = useEstudianteStore((state) => state.estudiantes);
  const setEstudiantes = useEstudianteStore((state) => state.setEstudiantes);

  const [searchValue, setSearchValue] = useState<string>(''); // Estado para almacenar el valor de búsqueda
  const [filteredEstudiantes, setFilteredEstudiantes] = useState<EstudianteInput[]>([]); // Estado para estudiantes filtrados

  useEffect(() => {
    if (isSuccess) {
      setEstudiantes(EstudiantesArray); // Guardar los estudiantes en el store
      setFilteredEstudiantes(EstudiantesArray); // Inicializar estudiantes filtrados con todos los estudiantes
    }
  }, [isSuccess, EstudiantesArray, setEstudiantes]);

  // Función para manejar la búsqueda
  const handleSearchChange = (value: string) => {
    setSearchValue(value); // Actualizar el valor de búsqueda

    if (value.length > 0) {
      // Filtrar estudiantes por nombre
      const filtered = Estudiantes.filter((estudiante) =>
        estudiante.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEstudiantes(filtered); // Actualizar estudiantes filtrados
    } else {
      setFilteredEstudiantes(Estudiantes); // Si no hay valor de búsqueda, mostrar todos los estudiantes
    }
  };

  return (
    <SafeArea swipeReload={refetch}>
      <View className="flex-1 web:mt-6 container mx-auto px-3">
        <Header Title="Estudiantes" EnableSearch onChange={handleSearchChange} />

        <FlatList
          data={Escuelas}
          numColumns={1}
          renderItem={({ item: escuela }) => (
            <View className="mb-3">
              <H3>{escuela.nombre}</H3>
              <FlatList
                data={[...new Set(filteredEstudiantes.filter((estudiante) => estudiante.escuelaId === escuela.id).map((estudiante) => estudiante.grado))]}
                numColumns={1}
                keyExtractor={(item) => item}
                renderItem={({ item: grado }) => (
                  <View className="mb-3">
                    <H4 className="pl-1">{grado}</H4>
                    <FlatList
                      className="h-32"
                      data={filteredEstudiantes.filter((estudiante) => estudiante.escuelaId === escuela.id && estudiante.grado === grado)}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item: estudiante }) => (
                        <EstudianteCard
                          item={estudiante}
                          editable={true}
                        />
                      )}
                    />
                  </View>
                )}
              />
            </View>
          )}
        />

        <Fab onPress={() => router.push('/estudiante/add')}>
          <AntDesign name="pluscircle" size={Platform.OS === "ios" ? 48 : 42} color="#28d18d" />
        </Fab>
      </View>
    </SafeArea>
  );
};

export default Explore;