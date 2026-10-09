import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Brand, Field, PrimaryButton, Screen } from '../src/components/kit';
import { colors } from '../src/theme/tokens';

export default function Login() {
  const router=useRouter();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  return <Screen className="pt-16">
    <View className="items-center my-10"><Brand large/></View>
    <Text className="text-3xl font-bold text-white mt-8">Inicia sesión</Text>
    <Text className="text-sm mt-3 mb-7 leading-6" style={{color:colors.muted}}>Accede para reportar incidentes y dar seguimiento a tus reportes.</Text>
    <Field label="Correo electrónico" value={email} onChangeText={setEmail} placeholder="usuario@ejemplo.com"
      autoCapitalize="none" keyboardType="email-address" autoComplete="email"/>
    <Field label="Contraseña" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry/>
    <View className="flex-row justify-between mb-9">
      <Text style={{color:colors.muted,fontSize:12}}>☑ Recordarme</Text>
      <Pressable onPress={()=>Alert.alert('Recuperar contraseña','Conecta este enlace con tu backend.') }>
        <Text style={{color:colors.cyan,fontSize:12}}>¿Olvidaste tu contraseña?</Text>
      </Pressable>
    </View>
    <PrimaryButton title="Iniciar sesión" onPress={()=>{
      if (!email.trim()||!password.trim()) return Alert.alert('Campos requeridos','Ingresa tu correo y contraseña.');
      // DEMO: Reemplazar con la autenticación real antes de usar en producción.
      router.replace('/dashboard');
    }}/>
    <View className="mt-8 items-center"><Text style={{color:colors.muted}}>— o continúa con —</Text></View>
    <View className="mt-5 flex-row" style={{gap:12}}>
      <View className="flex-1"><PrimaryButton title="Apple" secondary onPress={()=>Alert.alert('Apple','Integración pendiente.')}/></View>
      <View className="flex-1"><PrimaryButton title="Google" secondary onPress={()=>Alert.alert('Google','Integración pendiente.')}/></View>
    </View>
    <View className="mt-16 items-center">
      <Text style={{color:colors.muted,fontSize:13}}>¿No tienes una cuenta?</Text>
      <Text style={{color:colors.cyan,fontSize:13,marginTop:5}}>Contacta al administrador</Text>
    </View>
  </Screen>;
}
