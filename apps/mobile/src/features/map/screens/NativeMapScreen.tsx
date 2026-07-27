// import MapView, { Marker } from "react-native-maps";

// type Event = {
//   id: string;
//   title: string;
//   city: string;
//   latitude: number;
//   longitude: number;
// };

// type Props = {
//   events: Event[];
// };

// export function NativeMapScreen({ events }: Props) {
//   return (
//     <MapView
//       style={{
//         flex: 1,
//       }}
//       initialRegion={{
//         latitude: 48.8566,
//         longitude: 2.3522,
//         latitudeDelta: 5,
//         longitudeDelta: 5,
//       }}
//     >
//       {events.map((event) => (
//         <Marker
//           key={event.id}
//           coordinate={{
//             latitude: event.latitude,
//             longitude: event.longitude,
//           }}
//           title={event.title}
//           description={event.city}
//         />
//       ))}
//     </MapView>
//   );
// }
