// import { Stack } from 'expo-router';

// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//       <Stack.Screen name="login" />
//       {/* Puedes agregar más pantallas aquí */}
//     </Stack>
//   );
// }

import { Slot } from 'expo-router';

export default function Layout() {
  return <Slot />;
}
