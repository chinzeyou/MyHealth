import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function VideoConsultScreen({ onBack }) {
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      {/* 1. FULL SCREEN DOCTOR VIDEO (Background) */}
      <View style={StyleSheet.absoluteFillObject}>
        <View style={styles.fullScreenVideo}>
          <Ionicons name="person" size={150} color="#555" />
          <Text style={styles.doctorNameLabel}>Dr. Lee</Text>
          <Text style={styles.connectionText}>Stable Connection</Text>
        </View>
      </View>

      {/* 2. FLOATING TOP BAR */}
      <SafeAreaView style={styles.topBar}>
        <TouchableOpacity style={styles.iconCircle} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>

        <TouchableOpacity style={styles.iconCircle}>
          <Ionicons name="grid-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* 3. PICTURE-IN-PICTURE (User Self View) */}
      <View style={styles.pipView}>
        {cameraOff ? (
          <View style={styles.pipDisabled}>
            <Ionicons name="videocam-off" size={20} color="#FFF" />
          </View>
        ) : (
          <View style={styles.pipEnabled}>
             {/* Mocking user camera */}
             <Ionicons name="person-outline" size={30} color="#AAA" />
          </View>
        )}
      </View>

      {/* 4. BOTTOM ACTION BAR */}
      <View style={styles.bottomActionsContainer}>
        <View style={styles.glassMorphism}>
          <TouchableOpacity 
            style={[styles.actionBtn, isMuted && styles.btnActive]} 
            onPress={() => setIsMuted(!isMuted)}
          >
            <Ionicons name={isMuted ? "mic-off" : "mic"} size={24} color={isMuted ? "#FFF" : "#444"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBtn, cameraOff && styles.btnActive]} 
            onPress={() => setCameraOff(!cameraOff)}
          >
            <Ionicons name={cameraOff ? "videocam-off" : "videocam"} size={24} color={cameraOff ? "#FFF" : "#444"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="camera-reverse" size={24} color="#444" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.hangUpBtn} onPress={onBack}>
            <MaterialCommunityIcons name="phone-hangup" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  
  // Background Video Style
  fullScreenVideo: { 
    flex: 1, 
    backgroundColor: '#2C2C2E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  doctorNameLabel: { color: '#FFF', fontSize: 22, fontWeight: '600', marginTop: 20 },
  connectionText: { color: '#4CAF50', fontSize: 12, marginTop: 5 },

  // Top UI
  topBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    // Change marginTop to a higher value to clear system info
    marginTop: 50, 
    zIndex: 10
  },

  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  timerContainer: { 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    borderRadius: 20 
  },
  timerText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

  
  pipView: { 
    position: 'absolute', 
    // Increased top from 110 to 140 to stay relative to the lowered Top Bar
    top: 140, 
    right: 20, 
    width: 110, 
    height: 160, 
    borderRadius: 15, 
    backgroundColor: '#3A3A3C', 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    zIndex: 5,
    elevation: 10
  },
  pipEnabled: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#444' },
  pipDisabled: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF3B30' },

  // Bottom Controls
  bottomActionsContainer: { 
    position: 'absolute', 
    bottom: 50, 
    width: '100%', 
    alignItems: 'center',
    paddingHorizontal: 20
  },
  glassMorphism: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  actionBtn: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#F2F2F7', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  btnActive: { backgroundColor: '#007AFF' },
  hangUpBtn: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#FF3B30', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});