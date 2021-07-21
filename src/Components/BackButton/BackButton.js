import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function BackButton(props) {
    return (
        <TouchableOpacity style={styles.categoryIcon} onPress={props.onPress} >
            <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryIcon: {
        width: 20,
        height: 20,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});


