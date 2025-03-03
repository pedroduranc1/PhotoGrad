import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { EscuelaInput, GradoInput } from '@/types/ValidationTypes';

interface Props {
  data: EscuelaInput[] | GradoInput[];
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  value: string;
}

const DropdownComponent = ({ placeholder, data, onChange, onBlur, value }: Props) => {
  const renderItem = (item: EscuelaInput | GradoInput) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.nombre}</Text>
        {item.id === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="nombre"  // Mostrar el nombre en el dropdown
      valueField="id"      // Usar el id como valor seleccionado
      placeholder={placeholder}
      searchPlaceholder={`Buscar ${placeholder}`}
      value={value}
      onChange={(item) => {
        onChange(item);  // Pasar el id al onChange
      }}
      onBlur={onBlur}
      renderLeftIcon={() => (
        <>
          {placeholder === "Escuela" ? (
            <FontAwesome6 style={styles.icon} name="school" size={20} color="black" />
          ) : (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        </>
      )}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    margin: 0,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginHorizontal: 1.5,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});