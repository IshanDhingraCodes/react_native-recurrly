import { useClerk, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

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
          Settings
        </Text>
        <View className="size-10" />
      </View>

      <View className="p-5">
        <View className="mt-6 rounded-2xl border border-border bg-card p-4 gap-4">
          <View className="flex-row items-center gap-3">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="size-12 rounded-full"
              />
            ) : (
              <View className="size-12 items-center justify-center rounded-full bg-accent">
                <Text className="text-lg font-sans-bold text-background">
                  {(
                    user?.firstName?.[0] ??
                    user?.primaryEmailAddress?.emailAddress?.[0] ??
                    "U"
                  ).toUpperCase()}
                </Text>
              </View>
            )}
            <View className="flex-1">
              <Text className="text-base font-sans-semibold text-primary">
                {user?.fullName ??
                  user?.primaryEmailAddress?.emailAddress ??
                  "User"}
              </Text>
              <Text className="text-sm font-sans-medium text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress ?? ""}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          className={`mt-6 items-center rounded-2xl bg-accent py-4 ${isLoggingOut ? "opacity-70" : ""}`}
          onPress={handleSignOut}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#081126" />
          ) : (
            <Text className="text-base font-sans-bold text-primary">
              Sign out
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
