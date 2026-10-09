import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, RadioTower, MapPin } from 'lucide-react-native';
import { Screen, Brand, PrimaryButton, assets } from '../src/components/kit';
import { colors } from '../src/theme/tokens';

export default function Welcome() {
  const router=useRouter();
  return <Screen scroll={false} className="pt-12 pb-6">
    <Brand large/>
    <View className="mt-16">
      <Text className="text-4xl font-extrabold leading-tight text-white">Reporta.{"\n"}Coordina.{"\n"}
        <Text style={{color:colors.cyan}}>Resuelve.</Text>
      </Text>
      <Text className="mt-5 text-base leading-6" style={{color:colors.muted}}>
        Tu reporte ayuda a una ciudad más segura y conectada. Juntos mantenemos los servicios en funcionamiento.
      </Text>
    </View>
    <View className="mt-auto mb-4 overflow-hidden rounded-3xl border border-outline" style={{height:210}}>
      <ImageBackground source={assets.hero} resizeMode="cover" style={{flex:1,justifyContent:'flex-end'}}>
        <View style={{backgroundColor:'rgba(4,17,34,0.78)',padding:14,gap:9}}>
          <View className="flex-row items-center" style={{gap:9}}><RadioTower color={colors.cyan} size={16}/><Text className="text-xs text-white">Servicios en operación</Text></View>
          <View className="flex-row items-center" style={{gap:9}}><ShieldCheck color={colors.cyan} size={16}/><Text className="text-xs text-white">Respuesta más rápida</Text></View>
          <View className="flex-row items-center" style={{gap:9}}><MapPin color={colors.cyan} size={16}/><Text className="text-xs text-white">Una ciudad para todos</Text></View>
        </View>
      </ImageBackground>
    </View>
    <PrimaryButton title="Comenzar" onPress={()=>router.push('/login')}/>
  </Screen>;
}
