
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Reserva from '../../pages/Reserva/Reserva'
import EditarReserva from '../../pages/Reserva/EditarReserva'
import CrearReserva from '../../pages/Reserva/CrearReserva'
import Ficha from '../../pages/Ficha/Ficha';
import {editarPaciente, crearPaciente, pacientes} from '../../pages/Pacientes'

const ReservaStack = createNativeStackNavigator();
const ReservaStackNavigator=()=>{
    return(
        <ReservaStack.Navigator >
            <ReservaStack.Screen 
            name="Reserva" 
            component={Reserva} 
            options={{ title: 'Reserva' }}
            />
            <ReservaStack.Screen 
            name="CrearReserva" 
            component={CrearReserva}
            options={{ title: 'Crear Reserva' }}
            />
            <ReservaStack.Screen 
             name="EditarReserva"
             component={EditarReserva} 
             options={{ title: 'Editar Reserva' }}
            />
        </ReservaStack.Navigator>
    )
}

const FichaStack = createNativeStackNavigator();
const FichaStackNavigator=()=>{
    return(
        <FichaStack.Navigator>
            <FichaStack.Screen 
            name="Ficha"
             component={Ficha}
             options={{ title: 'Ficha' }}
             />
        </FichaStack.Navigator>
    )
}

const PacienteStack = createNativeStackNavigator();
const PacienteStackNavigator=()=>{
    return(
        <PacienteStack.Navigator>
            <PacienteStack.Screen 
                name="Paciente" 
                component={pacientes}
                options={{ title: 'Lista de Pacientes' }}
            />
            <PacienteStack.Screen
                name="CrearPaciente"
                component={crearPaciente}
                options={{ title: 'Crear Paciente' }}
            />
            <PacienteStack.Screen
                name="EditarPaciente"
                component={editarPaciente}
                options={{ title: 'Editar Paciente' }}
            />
        </PacienteStack.Navigator>
    )
}

export  {
    ReservaStackNavigator,
    FichaStackNavigator,
    PacienteStackNavigator
}
