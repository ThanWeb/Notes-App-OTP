import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Verification = ({ navigation }: { navigation: any }) => {
  const [otp, setOTP] = useState('');
  const { onVerification, onResend } = useAuth()

  const handleVerifyOTP = async () => {
    const result = await onVerification!(otp)
    console.log(result)

    if (result.error) {
      alert(result.message)
    } else {
      alert('Verifikasi Berhasil')
      navigation.navigate('Login')
    }
  };

  const handleResendOTP = async () => {
    const result = await onResend!()
    console.log(result)

    if (result.error) {
      alert(result.message)
    } else {
      alert('Silahkan Periksa Email')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        onChangeText={(text) => setOTP(text)}
        value={otp}
        keyboardType="numeric"
        maxLength={6}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={handleResendOTP}>
          <Text style={styles.buttonText}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 4,
    columnGap: 8
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  link: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Verification;
