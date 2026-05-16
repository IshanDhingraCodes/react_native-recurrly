import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { icons } from "@/constants/icons";
import clsx from "clsx";
import dayjs from "dayjs";

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (subscription: Subscription) => void;
}

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  Entertainment: "#ff9b9b",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#f5c542",
  Productivity: "#8fd1bd",
  Cloud: "#b8e8d0",
  Music: "#ea7a53",
  Other: "#d1d5db",
};

const CreateSubscriptionModal = ({
  visible,
  onClose,
  onSubmit,
}: CreateSubscriptionModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
  const [category, setCategory] = useState("Entertainment");

  const isValid = name.trim().length > 0 && parseFloat(price) > 0;

  const handleClose = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Entertainment");
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const newSubscription: Subscription = {
      id: Math.random().toString(36).substring(7),
      name,
      price: parseFloat(price),
      icon: icons.wallet,
      billing: frequency,
      category,
      status: "active",
      startDate: dayjs().toISOString(),
      renewalDate: dayjs()
        .add(1, frequency === "Monthly" ? "month" : "year")
        .toISOString(),
      color: CATEGORY_COLORS[category] || "#d1d5db",
    };

    onSubmit(newSubscription);
    handleClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <View className="modal-overlay">
        <Pressable className="flex-1" onPress={handleClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="modal-container"
        >
          <View className="modal-header">
            <Text className="modal-title">New Subscription</Text>
            <TouchableOpacity onPress={handleClose} className="modal-close">
              <Text className="modal-close-text">✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="modal-body" showsVerticalScrollIndicator={false}>
            <View className="auth-field">
              <Text className="auth-label">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Netflix, Spotify, etc."
                className="auth-input"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View className="auth-field">
              <Text className="auth-label">Price</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                keyboardType="decimal-pad"
                className="auth-input"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
              />
            </View>

            <View className="auth-field">
              <Text className="auth-label">Frequency</Text>
              <View className="picker-row">
                <TouchableOpacity
                  onPress={() => setFrequency("Monthly")}
                  className={clsx(
                    "picker-option",
                    frequency === "Monthly" && "picker-option-active",
                  )}
                >
                  <Text
                    className={clsx(
                      "picker-option-text",
                      frequency === "Monthly" && "picker-option-text-active",
                    )}
                  >
                    Monthly
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFrequency("Yearly")}
                  className={clsx(
                    "picker-option",
                    frequency === "Yearly" && "picker-option-active",
                  )}
                >
                  <Text
                    className={clsx(
                      "picker-option-text",
                      frequency === "Yearly" && "picker-option-text-active",
                    )}
                  >
                    Yearly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="auth-field">
              <Text className="auth-label">Category</Text>
              <View className="category-scroll">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    className={clsx(
                      "category-chip",
                      category === cat && "category-chip-active",
                    )}
                  >
                    <Text
                      className={clsx(
                        "category-chip-text",
                        category === cat && "category-chip-text-active",
                      )}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              className={clsx("auth-button", !isValid && "auth-button-disabled")}
            >
              <Text className="auth-button-text">Add Subscription</Text>
            </TouchableOpacity>

            <View className="h-10" />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default CreateSubscriptionModal;
