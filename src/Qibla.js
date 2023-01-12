import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';

import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

const camera_permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
const coarse_location = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
const fine_location = Platform.OS == 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

const Qibla = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>OK, let's face Qibla</Text>
        <Text style={styles.permissionDetail}>First we will request access to your</Text>
        <Text style={styles.permissionDetail}>camera and current location to point</Text>
        <Text style={styles.permissionDetail}>you in the right direction.</Text>
        
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16246f'
  },
  title: {
    fontSize: 36,
    color: '#FFF'
  },
  permissionDetail: {
    fontSize: 20,
    color: '#FFF'
  },
  btnGotit: {
    marginTop: 60,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 60,
    backgroundColor: '#FFF'
  },
  gotit: {
    fontSize: 20,
    color: '#000'
  }
});

export default Qibla;
