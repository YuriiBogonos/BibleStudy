import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import CustomHeader from "@/components/ui/CustomHeader";
import { Typography } from "@/types/Typography";

const AboutUsPage = () => {
  return (
    <SafeAreaView style={styles.content}>
      <View
        style={[
          styles.container,
          Platform.OS === "android" && { paddingTop: 40 },
        ]}
      >
        <CustomHeader screenTitle="About us" />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        >
          <Text style={Typography.h3}>Hi there, and welcome!</Text>
          <Text style={[Typography.verseText, styles.textTopMargin]}>
            This app was born from a simple yet powerful vision: to make the
            Bible more accessible to more people, no matter where they are in
            their faith journey. We know that understanding scripture can feel
            overwhelming, especially if you’re new to faith. That’s why we’ve
            created this app—to help make scripture easier to navigate and more
            approachable, so everyone can grow closer to God.
          </Text>

          <Text style={[Typography.verseText, styles.textTopMargin]}>
            Our mission is to help people connect with God’s Word in a way that
            feels approachable, personal, and relevant. By combining faith and
            innovation, we hope to create something that makes it easier for
            anyone to engage with the Bible, grow spiritually, and discover the
            joy of walking with God. We believe technology is a powerful tool
            that can be used to spread God’s kingdom and help more people find
            their way to Him. This app is our way of supporting that mission and
            helping others connect with the timeless truth of scripture in a
            modern, meaningful way.
          </Text>
          <Text style={[Typography.verseText, styles.textTopMargin]}>
            This app is still a work in progress, and we’re constantly working
            to improve it. If you have any thoughts, suggestions, or feedback,
            we’d love to hear from you! Please reach out to us at{" "}
            <Text style={Typography.ModalTitle}>
              feedback@biblebuddyAI.com.au{" "}
            </Text>
            — your input means so much to us.
          </Text>
          <Text style={[Typography.verseText, styles.textTopMargin]}>
            Thank you for joining us on this journey. Together, let’s bring more
            people to the kingdom of God!
          </Text>
          <Text style={[Typography.verseText, styles.textTopMargin]}>
            Blessings, The Bible Buddy Team.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AboutUsPage;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  textTopMargin: {
    marginTop: 10,
  },
});
