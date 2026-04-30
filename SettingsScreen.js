import { Ionicons } from '@expo/vector-icons';
import React from 'react'; // Removed local useState for darkMode
import { Alert, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// Added theme, isDarkMode, and toggleDarkMode to props
export default function SettingsScreen({ onBack, onEdit, userData, isDarkMode, toggleDarkMode, theme }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const SettingRow = ({ icon, label, value, onPress, type = 'arrow', color = theme.primary }) => (
    <TouchableOpacity 
      style={[styles.row, { borderBottomColor: theme.border }]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      {type === 'arrow' && <Ionicons name="chevron-forward" size={20} color={theme.subText} />}
      {type === 'switch' && (
        <Switch 
          value={value} 
          onValueChange={onPress} 
          trackColor={{ false: "#767577", true: theme.primary }}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Section */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.avatar}>
            {userData?.profileImage ? (
              <Image source={{ uri: userData.profileImage }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={40} color={theme.primary} />
            )}
          </View>
          <View>
            <Text style={[styles.userName, { color: theme.text }]}>{userData?.name || 'User'}</Text>
            <Text style={[styles.userEmail, { color: theme.subText }]}>{userData?.email || 'user@email.com'}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.editBtn, { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' }]} 
            onPress={onEdit}
          >
            <Text style={[styles.editBtnText, { color: theme.primary }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.subText }]}>Preferences</Text>
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <SettingRow 
            icon="notifications-outline" 
            label="Push Notifications" 
            type="switch" 
            value={notificationsEnabled} 
            onPress={() => setNotificationsEnabled(!notificationsEnabled)} 
          />
          <SettingRow 
            icon="moon-outline" 
            label="Dark Mode" 
            type="switch" 
            value={isDarkMode} 
            onPress={toggleDarkMode} // This now triggers the global state in App.js
            color="#5856D6"
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.subText }]}>Account & Security</Text>
        <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <SettingRow icon="lock-closed-outline" label="Privacy Settings" color="#4CAF50" />
          <SettingRow icon="card-outline" label="Payment Methods" color="#FF9500" />
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => Alert.alert("Logout", "Are you sure you want to sign out?")}
        >
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    paddingTop: 50, 
    borderBottomWidth: 1 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  profileCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 25, 
    borderWidth: 1 
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#EBF4FF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15,
    overflow: 'hidden'
  },
  avatarImg: { width: 60, height: 60 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  userEmail: { fontSize: 14 },
  editBtn: { marginLeft: 'auto', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  editBtnText: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10, marginLeft: 5, textTransform: 'uppercase' },
  section: { borderRadius: 15, overflow: 'hidden', marginBottom: 20, borderWidth: 1 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1 },
  iconContainer: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  rowLabel: { flex: 1, fontSize: 16 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, padding: 15 },
  logoutText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});