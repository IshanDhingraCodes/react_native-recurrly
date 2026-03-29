import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>SubscriptionDetails: {id}</Text>
      <Link
        href="/(tabs)/subscriptions"
        className="text-primary p-2 rounded-2xl mt-4"
      >
        Back
      </Link>
    </View>
  );
};

export default SubscriptionDetails;
