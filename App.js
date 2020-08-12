import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQRData] = useState("");
  const [count, setCount] = useState(0);
  const [scannedQRList, setScannedQRList] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQRData(data);
    const foundQR = scannedQRList.find((obj)=> obj.code === data );
    if(foundQR == null){
      //scannedQRList.push(newCode);
      setScannedQRList(scannedQRList.concat({'code': data, 'count': 1}));
      setCount(1);
    } else {
      foundQR.count += 1;
      setCount(foundQR.count);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'flex-end', }}>
      <View style={{height: "100%" }}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
      </View>
      <View>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        <Text><Text style={styles.textLabel}>Data: </Text>{qrData}</Text>
        <Text><Text style={styles.textLabel}>Count: </Text>{count}</Text>
      </View>      
    </View>
  );
}
const styles = StyleSheet.create({
  textLabel: {
    fontWeight: 'bold'
  },
});
// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [data, setData] = useState("");

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setData(data);
//     alert(`${data}     scanned!`);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View
//       style={{
//         flex: 0.5,
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//       }}>
//         <View style={{borderWidth: "1px", height:"100%"}}>
//             <BarCodeScanner
//             onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//             style={StyleSheet.absoluteFillObject}
//         />

//           {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          
//         </View>
      
//       <View><Text>{data}</Text><Button style={{ borderWidth:"1px" }} title={'Tap to Scan Again'} onPress={() => setScanned(false)} /></View>
//     </View>
//   );
// }