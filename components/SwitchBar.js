import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const SwitchBar = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#68F725", true: "#68F725" }}
        thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
        ios_backgroundColor="#E43030"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: 'row', 
    marginRight:'1%',
    marginTop:'1%',
    

  }
});

export default SwitchBar;
