import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link
        href="/(auth)/sign-in"
        className="mt-4 p-4 bg-accent text-white text-md font-semibold rounded-2xl"
      >
        Go to sign in
      </Link>
      <Link
        href="/subscriptions/spotify"
        className="mt-4 p-4 bg-primary text-white text-md font-semibold rounded-2xl"
      >
        Go to subscription spotify
      </Link>
      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" },
        }}
        className="mt-4 p-4 bg-primary text-white text-md font-semibold rounded-2xl"
      >
        Go to subscription claude
      </Link>
    </View>
  );  
}
