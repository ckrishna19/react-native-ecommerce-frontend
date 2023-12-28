import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { FontAwesome, AntDesign } from "react-native-vector-icons";
const ChatFooter = () => {
  const [text, setText] = useState("");
  const [textHeight, setTextHeight] = useState(40); // Initial height
  const maxTextHeight = 100; // Maximum height
  const minTextHeight = 40; // Minimum height

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    // Update the height dynamically based on the contentHeight within the min and max limits
    setTextHeight(
      Math.min(maxTextHeight, Math.max(minTextHeight, contentHeight))
    );
  };
  return (
    <View style={tw`flex-row p-3  gap-x-2  items-start`}>
      <TextInput
        style={tw`flex-1 border text-[#ccc] border-[#7c7c7c] rounded-lg p-2 max-h-[100px] `}
        multiline
        placeholderTextColor="#ccc"
        value={text}
        onChangeText={(newText) => setText(newText)}
        onContentSizeChange={(e) =>
          handleContentSizeChange(
            e.nativeEvent.contentSize.width,
            e.nativeEvent.contentSize.height
          )
        }
        placeholder="Type your message..."
        maxHeight={maxTextHeight}
      />

      <TouchableOpacity style={tw`mt-2`} onPress={() => setText("")}>
        <FontAwesome name="send" size={20} color="#7C7C7C" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatFooter;
