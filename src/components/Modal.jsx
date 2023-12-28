import { View, Text, Modal as Mod } from "react-native";
import React from "react";

const Modal = ({ showModal, setShowModal }) => {
  return (
    <Mod
      animationType="fade"
      transparent="true"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View>
        <Text>Modal</Text>
      </View>
    </Mod>
  );
};

export default Modal;
