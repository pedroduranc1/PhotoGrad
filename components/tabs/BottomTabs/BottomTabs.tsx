import React from 'react'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { Text } from '@/components/ui/text';

const rutas = [
  {
    name: 'index',
    component: require('@/app/(tabs)/index').default,
  },
  {
    name: 'estudiantes',
    component: require('@/app/(tabs)/estudiantes').default,
  },
  {
    name: 'inicio',
    component: require('@/app/(tabs)/inicio').default,
  },
  {
    name: 'paquetes',
    component: require('@/app/(tabs)/paquetes').default,
  },
  {
    name: 'pagos',
    component: require('@/app/(tabs)/pagos').default,
  }
]

const BottomTabs = () => {
  const Seticons = (ruta: string, focused: boolean) => {
    if (ruta === 'index') {
      return <FontAwesome6 size={20} name="school" color={focused ? "#28d18d" : "#c8ccca"} />
    }
    if (ruta === 'estudiantes') {
      return <Fontisto size={20} name="person" color={focused ? "#28d18d" : "#c8ccca"} />
    }
    if (ruta === 'inicio') {
      return <Entypo size={20} name="home" color={focused ? "#28d18d" : "#c8ccca"} />
    }
    if (ruta === 'paquetes') {
      return <Feather size={20} name="package" color={focused ? "#28d18d" : "#c8ccca"} />
    }
    if (ruta === 'pagos') {
      return <MaterialIcons size={20} name="payments" color={focused ? "#28d18d" : "#c8ccca"} />
    }
  }
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
            title: ruta.name,
            tabBarIcon: ({ focused }) => (
              <>
                {Seticons(ruta.name, focused)}
                <Text className={`first-letter:uppercase mt-1 text-sm ${focused ? "text-ph_primary" : "text-gray-500"}`}>{ruta.name === "index" ? 'escuelas' : ruta.name}</Text>
              </>
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    width: "45%",
    bottom: 30,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 10,
    marginHorizontal: "auto",
  },
  tabBarIcon: {
    marginTop: 5,
  },
  tabBarLabel: {
    fontSize: 10,
    marginBottom: 5,
    display: "none"
  },
});

export default BottomTabs