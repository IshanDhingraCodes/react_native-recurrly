import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/context/SubscriptionContext";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const { subscriptions } = useSubscriptions();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.category || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-background p-5" edges={["top"]}>
      <View className="mt-4 mb-6">
        <Text className="text-3xl font-sans-bold text-primary mb-5">
          Subscriptions
        </Text>
        <View className="flex-row items-center bg-card border border-border rounded-2xl px-4 py-3.5">
          <Ionicons
            name="search-outline"
            size={20}
            color="rgba(8, 17, 38, 0.6)"
          />
          <TextInput
            placeholder="Search subscriptions..."
            placeholderTextColor="rgba(8, 17, 38, 0.4)"
            className="flex-1 ml-3 text-base font-sans-medium text-primary"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>
      </View>

      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4">
            <SubscriptionCard
              {...item}
              expanded={expandedId === item.id}
              onPress={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons
              name="search-outline"
              size={48}
              color="rgba(8, 17, 38, 0.2)"
            />
            <Text className="text-muted-foreground font-sans-medium mt-4 text-lg">
              No subscriptions found
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
