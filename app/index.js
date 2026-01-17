import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding"); // ✅ use relative path (no "/")
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/welcome");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, loading]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Image
        source={require("../assets/images/splash.png")}
        className="w-393 h-852"
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default Splash;
