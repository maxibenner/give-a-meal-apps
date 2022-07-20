import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { textStyles, theme } from "../../theme";

export const Carousel = ({
  data,
}: {
  data: { title: string; body: string }[];
}) => {
  const screenWidth = React.useMemo(() => Dimensions.get("window").width, []);
  const [pos, setPos] = React.useState(0);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        onMomentumScrollEnd={(e) => setPos(e.nativeEvent.contentOffset.x)}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
      >
        <>
          {data.map((item) => (
            <View
              key={item.title}
              style={[styles.textContainer, { width: screenWidth }]}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          ))}
        </>
      </ScrollView>
      <View style={styles.dotContainer}>
        {data.map((page, i) => (
          <View
            key={page.title}
            style={[
              styles.dot,
              {
                backgroundColor:
                  pos < screenWidth * (i + 1) && pos >= screenWidth * i
                    ? theme.colors.element_dark_active
                    : theme.colors.element_dark_inactive,

                width:
                  pos < screenWidth * (i + 1) && pos >= screenWidth * i
                    ? 12
                    : 10,
                height:
                  pos < screenWidth * (i + 1) && pos >= screenWidth * i
                    ? 12
                    : 10,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  textContainer: { paddingHorizontal: theme.spacing.md },
  title: {
    ...textStyles.header_2,
    marginBottom: theme.spacing.sm,
  },
  body: {
    ...textStyles.body,
    paddingBottom: theme.spacing.md,
  },
  dotContainer: {
    flex: 1,
    flexDirection: "row",
    padding: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    alignItems: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 6,
    marginRight: theme.spacing.md / 2,
  },
});
