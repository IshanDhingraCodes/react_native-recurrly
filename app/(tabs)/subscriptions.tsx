import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/context/SubscriptionContext";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const router = useRouter();
  const { subscriptions } = useSubscriptions();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.category || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="size-10 items-center justify-center rounded-full border border-border"
        >
          <Ionicons name="chevron-back" size={24} color="#081126" />
        </TouchableOpacity>
        <Text className="text-xl flex-1 text-center font-sans-bold text-primary">
          Subscriptions
        </Text>
        <View className="size-10" />
      </View>

      <View className="px-5">
        <View className="mb-6 mt-2">
          <View className="flex-row items-center rounded-2xl border border-border bg-card px-4 py-3.5">
            <Ionicons
              name="search-outline"
              size={20}
              color="rgba(8, 17, 38, 0.6)"
            />
            <TextInput
              placeholder="Search subscriptions..."
              placeholderTextColor="rgba(8, 17, 38, 0.4)"
              className="ml-3 flex-1 text-base font-sans-medium text-primary"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
          </View>
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
        contentContainerClassName="px-5 pb-24"
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
