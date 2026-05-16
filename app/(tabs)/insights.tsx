import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const CHART_DATA = [
  { day: "Mon", value: 35 },
  { day: "Tue", value: 30 },
  { day: "Wed", value: 20 },
  { day: "Thr", value: 40, highlight: true },
  { day: "Fri", value: 35 },
  { day: "Sat", value: 18 },
  { day: "Sun", value: 22 },
];

const Insights = () => {
  const router = useRouter();
  const { subscriptions } = useSubscriptions();

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
          Monthly Insights
        </Text>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="mt-6">
          <ListHeading
            title="Upcoming"
            onPress={() => router.push("/subscriptions")}
          />
          <View className="mt-4 rounded-3xl border border-border bg-card p-6 pt-12">
            <View className="h-40 flex-row items-end justify-between">
              {CHART_DATA.map((item, index) => (
                <View key={index} className="h-full items-center justify-end">
                  <View
                    style={{ height: `${item.value * 2}%` }}
                    className={`relative w-3 items-center rounded-full ${item.highlight ? "bg-accent" : "bg-primary"}`}
                  >
                    {item.highlight && (
                      <View className="absolute -top-14 w-12 items-center">
                        <View className="rounded-lg border border-border bg-white px-2 py-1 shadow-sm">
                          <Text className="text-xs font-sans-bold text-accent">
                            $40
                          </Text>
                        </View>
                        <View className="h-4 w-px bg-accent" />
                      </View>
                    )}
                  </View>
                  <Text className="mt-3 text-xs font-sans-medium text-muted-foreground">
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>

            <View className="absolute bottom-12 left-6 right-6 top-6 -z-10 justify-between opacity-5">
              {[...Array(5)].map((_, i) => (
                <View key={i} className="h-px w-full bg-primary" />
              ))}
            </View>
          </View>
        </View>

        <View className="mt-8 flex-row items-center justify-between rounded-3xl border border-border bg-card p-6">
          <View>
            <Text className="text-xl font-sans-bold text-primary">
              Expenses
            </Text>
            <Text className="mt-1 text-sm font-sans-medium text-muted-foreground">
              March 2026
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-2xl font-sans-bold text-primary">
              -$424.63
            </Text>
            <Text className="mt-1 text-sm font-sans-semibold text-success">
              +12%
            </Text>
          </View>
        </View>

        <View className="mt-8 mb-10">
          <ListHeading
            title="History"
            onPress={() => router.push("/subscriptions")}
          />
          <View className="mt-4 gap-4">
            {subscriptions.slice(0, 3).map((sub) => (
              <SubscriptionCard
                key={sub.id}
                {...sub}
                expanded={false}
                onPress={() => {}}
              />
            ))}
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;
