import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Camera, MapPin, Plus, X } from 'lucide-react-native';
import { AppTopBar, CategoryTile, Field, LocationMap, PrimaryButton, ReportSteps, Screen } from '../src/components/kit';
import { colors, incidentKinds, type IncidentKind } from '../src/theme/tokens';

export default function NewReport() {
 const router=useRouter();
 const [kind,setKind]=useState<IncidentKind>('electric');
 const [title,setTitle]=useState('');
 const [description,setDescription]=useState('');
 const [location,setLocation]=useState('Av. Principal, Zona Centro, Santo Domingo, D.N.');
 const [photos,setPhotos]=useState<string[]>([]);
 const [step,setStep]=useState<1|2|3>(1);
 const addPhotos=async()=>{
   const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
   if(!permission.granted) return Alert.alert('Permiso necesario','Habilita el acceso a las fotos para adjuntar evidencias.');
   const res=await ImagePicker.launchImageLibraryAsync({mediaTypes:['images'],allowsMultipleSelection:true,selectionLimit:4,quality:0.85});
   if(!res.canceled) setPhotos(prev=>[...prev,...res.assets.map(a=>a.uri)].slice(0,4));
 };
 const next=()=>{
   if(step===1){if(!title.trim()||!description.trim()) return Alert.alert('Completa el reporte','Escribe el título y la descripción.'); setStep(2);}
   else if(step===2){if(!location.trim()) return Alert.alert('Ubicación requerida','Indica la ubicación del evento.'); setStep(3);}
   else {
     // DEMO: Aquí enviar FormData con título, descripción, categoría, ubicación y archivos.
     router.replace('/confirmation');
   }
 };
 return <Screen className="pt-1">
   <AppTopBar title="Nuevo reporte"/>
   <ReportSteps step={step}/>
   {step===1&&<>
     <Text className="font-bold text-white mb-3">1. Selecciona el tipo de evento</Text>
     <View className="flex-row mb-6" style={{gap:10}}>{incidentKinds.map(k=><CategoryTile key={k.id} kind={k.id} selected={kind===k.id} onPress={()=>setKind(k.id)}/>)}</View>
     <Text className="font-bold text-white mb-3">2. Cuéntanos qué está ocurriendo</Text>
     <Field label="Título del evento" placeholder="Ej. Corte de electricidad en avenida principal" value={title} onChangeText={setTitle}/>
     <Field label="Descripción" placeholder="Describe lo que está ocurriendo... Incluye detalles relevantes." multiline maxLength={500}
       value={description} onChangeText={setDescription}/>
     <Text className="text-right mb-6" style={{color:colors.muted,fontSize:11}}>{description.length}/500</Text>
     <Text className="font-bold text-white mb-3">3. Ubicación</Text><LocationMap/>
   </>}
   {step===2&&<>
     <Text className="text-xl font-bold text-white mb-3">Ubicación y evidencias</Text>
     <Field label="Dirección del evento" value={location} onChangeText={setLocation}/>
     <LocationMap/>
     <Text className="text-base font-bold text-white mt-7 mb-3">Fotografías del incidente</Text>
     <Pressable onPress={addPhotos} className="h-32 rounded-xl border border-dashed border-outline bg-surface items-center justify-center" style={{gap:7}}>
       <Camera color={colors.cyan} size={29}/>
       <Text className="text-white font-semibold">Adjuntar imágenes</Text>
       <Text style={{color:colors.muted,fontSize:11}}>Hasta 4 fotos · Galería del dispositivo</Text>
     </Pressable>
     <View className="flex-row flex-wrap mt-4" style={{gap:10}}>{photos.map(uri=><View key={uri}>
       <Image source={{uri}} style={{width:77,height:77,borderRadius:10}}/>
       <Pressable onPress={()=>setPhotos(a=>a.filter(v=>v!==uri))} style={{position:'absolute',right:-5,top:-5,backgroundColor:colors.road,borderRadius:12,padding:3}}><X size={13} color="white"/></Pressable>
     </View>)}</View>
   </>}
   {step===3&&<>
     <Text className="text-2xl font-bold text-white mb-3">Confirma tu reporte</Text>
     <Text style={{color:colors.muted,marginBottom:20}}>Revisa los datos antes de enviarlos.</Text>
     <View className="rounded-2xl border border-outline bg-surface p-4" style={{gap:12}}>
       <Text className="font-bold text-white">{title}</Text>
       <Text style={{color:colors.cyan}}>Tipo: {incidentKinds.find(k=>k.id===kind)?.name}</Text>
       <Text style={{color:colors.muted}}>{description}</Text>
       <Text style={{color:colors.muted}}>Ubicación: {location}</Text>
       <Text style={{color:colors.muted}}>Fotos adjuntas: {photos.length}</Text>
     </View>
   </>}
   <View className="mt-8"><PrimaryButton title={step===3?'Enviar reporte':'Siguiente'} onPress={next}/></View>
   {step>1&&<Pressable onPress={()=>setStep(step===3?2:1)} className="items-center py-5"><Text style={{color:colors.muted}}>Volver al paso anterior</Text></Pressable>}
 </Screen>;
}
