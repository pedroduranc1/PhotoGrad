import React from 'react'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

const rutas = [
    {
        name: 'index',
        title: 'Escuelas',
        component: require('@/app/(tabs)/index').default,
    },
    {
        name: 'estudiantes',
        title: 'Estudiantes',
        component: require('@/app/(tabs)/estudiantes').default,
    },
    {
        name: 'inicio',
        title: 'Inicio',
        component: require('@/app/(tabs)/inicio').default,
    },
    {
        name: 'paquetes',
        title: 'Paquetes',
        component: require('@/app/(tabs)/paquetes').default,
    },
    {
        name: 'pagos',
        title: 'Pagos',
        component: require('@/app/(tabs)/pagos').default,
    }
]

const BottomTabs = () => {
  return (
    <Tabs
      initialRouteName='inicio'
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#28d18d',
      }}>
        {rutas.map((ruta) => (
            <Tabs.Screen
            key={ruta.name}
            name={ruta.name}
            options={{
                title: ruta.title,
                tabBarIcon: ({ focused }) => {
                    if (ruta.name === 'index') {
                        return <FontAwesome6 size={16} name="school" color={focused ? "#28d18d" : "#c8ccca"} />
                    }
                    if (ruta.name === 'estudiantes') {
                        return <Fontisto size={16} name="person" color={focused ? "#28d18d" : "#c8ccca"} />
                    }
                    if (ruta.name === 'inicio') {
                        return <Entypo size={16} name="home" color={focused ? "#28d18d" : "#c8ccca"} />
                    }
                    if (ruta.name === 'paquetes') {
                        return <Feather size={16} name="package" color={focused ? "#28d18d" : "#c8ccca"} />
                    }
                    if (ruta.name === 'pagos') {
                        return <MaterialIcons size={16} name="payments" color={focused ? "#28d18d" : "#c8ccca"} />
                    }
                },
            }}
            />
        ))}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 10,
    marginHorizontal:20
  },
  tabBarIcon: {
    marginTop: 3,
  },
  tabBarLabel: {
    fontSize: 10 ,
    marginBottom: 3,
  },
});

export default BottomTabs