import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import useOrientation from '../backend/useOrientation';
import useLocation from '../backend/useLocation';
import * as Location from 'expo-location';

export default function OrientationCalibration({ navigation }) {
  const rotation = useOrientation();
  const location = useLocation(true, 1000);
  const [heading, setHeading] = useState(null);
  const [testResults, setTestResults] = useState({});

  useEffect(() => {
    const getHeading = async () => {
      try {
        const h = await Location.getHeadingAsync();
        setHeading(h);
      } catch (err) {
        console.error('Heading error:', err);
      }
    };

    const interval = setInterval(getHeading, 500);
    return () => clearInterval(interval);
  }, []);

  const checkTest = (testName) => {
    setTestResults({ ...testResults, [testName]: !testResults[testName] });
  };

  const tests = [
    {
      id: 'horizontal',
      title: 'Phone Horizontal - Plane Overhead',
      instruction: 'Lay phone flat. Plane directly above should be at screen center',
      expected: 'Beta ≈ 0°, Dot centered',
    },
    {
      id: 'north',
      title: 'Phone Pointing North',
      instruction: 'Point phone north (0°). Plane to north should be centered',
      expected: 'Alpha/Heading ≈ 0°, Dot centered',
    },
    {
      id: 'south',
      title: 'Phone Pointing South',
      instruction: 'Point phone south (180°). Plane to north should be off-screen',
      expected: 'Alpha/Heading ≈ 180°, Dot behind you',
    },
    {
      id: 'tiltUp',
      title: 'Phone Tilted Up 45°',
      instruction: 'Tilt phone top away from you. Plane at horizon moves down',
      expected: 'Beta ≈ +45°, Dot moves to bottom',
    },
    {
      id: 'tiltDown',
      title: 'Phone Tilted Down 45°',
      instruction: 'Tilt phone top toward you. Plane at horizon moves up',
      expected: 'Beta ≈ -45°, Dot moves to top',
    },
    {
      id: 'rollLeft',
      title: 'Phone Rolled 90° Left',
      instruction: 'Rotate phone counterclockwise. Dot should rotate 90° around center',
      expected: 'Gamma ≈ -90°, Dot rotates with phone',
    },
    {
      id: 'rollRight',
      title: 'Phone Rolled 90° Right',
      instruction: 'Rotate phone clockwise. Dot should rotate 90° around center',
      expected: 'Gamma ≈ +90°, Dot rotates with phone',
    },
    {
      id: 'gimbalLock',
      title: 'Steep Tilt (>60°) - No Jumping',
      instruction: 'Tilt phone very steeply up. Dot should NOT jump erratically',
      expected: 'Beta > 60°, Gimbal lock protection active',
    },
  ];

  const radToDeg = (rad) => ((rad * 180) / Math.PI).toFixed(1);
  const alpha = rotation?.alpha || 0;
  const beta = rotation?.beta || 0;
  const gamma = rotation?.gamma || 0;

  const passedTests = Object.values(testResults).filter(Boolean).length;
  const totalTests = tests.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orientation Calibration</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Current Orientation Data</Text>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Alpha (Compass):</Text>
            <Text style={styles.dataValue}>{radToDeg(alpha)}°</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Beta (Pitch):</Text>
            <Text style={styles.dataValue}>{radToDeg(beta)}°</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Gamma (Roll):</Text>
            <Text style={styles.dataValue}>{radToDeg(gamma)}°</Text>
          </View>

          {heading !== null && (
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>GPS Heading:</Text>
              <Text style={styles.dataValue}>{heading.magHeading?.toFixed(1) || 'N/A'}°</Text>
            </View>
          )}

          {location && (
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Location:</Text>
              <Text style={styles.dataValue}>
                {location.lat?.toFixed(4)}, {location.lng?.toFixed(4)}
              </Text>
            </View>
          )}

          <View style={styles.gimbalWarning}>
            {Math.abs(beta) > 1.1 ? ( // ~63 degrees
              <>
                <MaterialIcons name="warning" size={20} color="#ff6b6b" />
                <Text style={styles.gimbalText}>⚠️ Gimbal Lock Zone - Protection Active</Text>
              </>
            ) : (
              <>
                <MaterialIcons name="check-circle" size={20} color="#51cf66" />
                <Text style={styles.safeText}>✓ Safe Orientation Range</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Test Progress</Text>
          <Text style={styles.progressText}>
            {passedTests} / {totalTests} tests completed
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(passedTests / totalTests) * 100}%` }]} />
          </View>
        </View>

        <View style={styles.testsContainer}>
          <Text style={styles.sectionTitle}>Calibration Tests</Text>
          <Text style={styles.sectionSubtitle}>
            Perform each test in the Tracker tab, then check it off here
          </Text>

          {tests.map((test) => (
            <TouchableOpacity
              key={test.id}
              style={styles.testCard}
              onPress={() => checkTest(test.id)}
            >
              <View style={styles.testHeader}>
                <View style={styles.checkbox}>
                  {testResults[test.id] ? (
                    <AntDesign name="check-circle" size={24} color="#51cf66" />
                  ) : (
                    <AntDesign name="check-circle" size={24} color="#ccc" />
                  )}
                </View>
                <Text style={[styles.testTitle, testResults[test.id] && styles.testTitleDone]}>
                  {test.title}
                </Text>
              </View>

              <Text style={styles.testInstruction}>{test.instruction}</Text>
              <Text style={styles.testExpected}>Expected: {test.expected}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📖 How to Use</Text>
          <Text style={styles.infoText}>
            1. Navigate to the Tracker tab{'\n'}
            2. Select a plane to track{'\n'}
            3. Perform each test listed above{'\n'}
            4. Return here and check off passing tests{'\n'}
            5. If tests fail, orientation math needs adjustment
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔧 Common Issues</Text>
          <Text style={styles.infoText}>
            • <Text style={styles.bold}>Dot drifts left/right:</Text> Compass (alpha) is wrong - use GPS heading{'\n'}
            • <Text style={styles.bold}>Dot jumps when tilted:</Text> Gimbal lock - check beta angle protection{'\n'}
            • <Text style={styles.bold}>Dot in wrong quadrant:</Text> Rotation matrix order is incorrect{'\n'}
            • <Text style={styles.bold}>Dot doesn't rotate with phone:</Text> Roll (gamma) not applied properly
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dataLabel: {
    fontSize: 16,
    color: '#666',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  gimbalWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  gimbalText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: '600',
  },
  safeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#51cf66',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#51cf66',
  },
  testsContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  testCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 12,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  testTitleDone: {
    color: '#51cf66',
    textDecorationLine: 'line-through',
  },
  testInstruction: {
    fontSize: 14,
    color: '#666',
    marginLeft: 36,
    marginBottom: 4,
  },
  testExpected: {
    fontSize: 13,
    color: '#007AFF',
    marginLeft: 36,
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
    color: '#333',
  },
});
