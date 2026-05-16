import { useClerk, useUser } from "@clerk/expo";
import { styled } from "nativewind";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-2xl font-sans-bold text-primary">Settings</Text>

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
                {(user?.firstName?.[0] ?? user?.primaryEmailAddress?.emailAddress?.[0] ?? "U").toUpperCase()}
              </Text>
            </View>
          )}
          <View className="flex-1">
            <Text className="text-base font-sans-semibold text-primary">
              {user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "User"}
            </Text>
            <Text className="text-sm font-sans-medium text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        className="mt-6 items-center rounded-2xl bg-accent py-4"
        onPress={() => signOut()}
      >
        <Text className="text-base font-sans-bold text-primary">Sign out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;
