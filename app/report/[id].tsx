import React from 'react';
import { Image, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CalendarDays, MapPin, UserRound, Zap } from 'lucide-react-native';
import { AppTopBar, LocationMap, PrimaryButton, Screen, StatusPill, Timeline, assets, reports } from '../../src/components/kit';
import { colors } from '../../src/theme/tokens';

export default function Tracking() {
 const router=useRouter(); const {id}=useLocalSearchParams<{id:string}>();
 const report=reports.find(r=>r.id===id)??reports[0];
 return <Screen className="pt-1">
   <AppTopBar title={`Reporte #${report.id}`}/>
   <View className="flex-row items-start mb-5" style={{gap:12}}>
     <View className="h-10 w-10 rounded-full items-center justify-center" style={{backgroundColor:colors.warning}}><Zap size={22} color="white" fill="white"/></View>
     <View className="flex-1"><Text className="font-extrabold text-white">{report.title}</Text>
       <Text style={{color:colors.muted,fontSize:12,marginTop:4}}>{report.address}</Text>
       <Text style={{color:colors.muted,fontSize:11}}>Santo Domingo, D.N.</Text></View>
     <StatusPill status={report.status}/>
   </View>
   <LocationMap tracking/>
   <View className="flex-row mt-3" style={{gap:8}}>
     {[require('../../assets/images/event-powerline-01.png'),require('../../assets/images/event-powerline-02.png'),require('../../assets/images/event-powerline-03.png')].map((source,index)=><Image key={index} source={source} resizeMode="cover" style={{flex:1,height:92,borderRadius:12}}/>) }
   </View>
   <Text className="font-bold text-white mt-7 mb-3">Información del reporte</Text>
   <View className="rounded-xl border border-outline bg-surface px-4 py-2" style={{gap:12}}>
     {[
       ['Tipo de evento','Eléctrico'],['Fecha y hora','8 oct. 2024 · 10:24 a. m.'],
       ['Ubicación',report.address],['Reportado por','María López']
     ].map(([label,value])=><View key={label} className="flex-row justify-between" style={{gap:12}}>
       <Text style={{color:colors.muted,fontSize:12}}>{label}</Text>
       <Text numberOfLines={1} style={{color:colors.text,fontSize:12,flex:1,textAlign:'right'}}>{value}</Text>
     </View>)}
   </View>
   <Text className="font-bold text-white mt-7 mb-3">Estado del reporte</Text>
   <Timeline/>
   <View className="mt-3"><PrimaryButton title="Ver mi reporte" onPress={()=>router.push('/dashboard')}/></View>
 </Screen>;
}
