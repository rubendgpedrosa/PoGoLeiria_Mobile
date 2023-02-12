import { Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet, View } from "react-native";

export default function QuestCard(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigate("QuestMapLocationScreen", {
          category: props.item,
        })
      }
      style={styles.questCardItem}
    >
      <View style={styles.rowContainerFullWidth}>
        <View style={styles.textContainer}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: "baseline" }}>
                <Text style={styles.textPrimary}>{props.item.quest_description}</Text>
                <Text style={styles.textNumberCount}>x{props.item.pokestops.length ?? 0}</Text>
            </View>
          <Text style={styles.textSecondary}>
            {props.item.quest_reward}
          </Text>
        </View>
        <View style={{width: 60}}>
          <Image
            style={Object.assign({}, styles.rewardImage, props.categoryColor)}
            resizeMode="contain"
            source={props.handleRewardImage(props.item)}
          />
          {props.item.quest_reward_type === "Pokemon" ? (
            <Text style={styles.badgeRewardImage}>
              {props.replace}
            </Text>
          ) : (
            <Text style={styles.badgeRewardImage}>
              x{props.item.quest_reward_amount}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    questCardItem: {
      width: "100%",
      height: 70,
      borderRadius: 10,
      justifyContent: "center",
      backgroundColor: "#141414",
      marginBottom: 10,
    },
    textContainer: {
      flex: 1,
      paddingLeft: 20,
      justifyContent: "center",
    },
    textPrimary: {
      fontSize: 15,
      paddingBottom: 0,
      marginBottom: 0,
      fontWeight: "bold",
      color: "#EEE5E9",
    },
    textSecondary: {
      fontSize: 13,
      opacity: 0.6,
      color: "#EEE5E9",
    },
    textNumberCount: {
        fontSize: 13,
        color: "#EEE5E9",

    },
    rewardImage: {
      width: 60,
      height: 70,
      borderRadius: 10,
      backgroundColor: "#f5c032",
    },
    rowContainerFullWidth: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    badgeRewardImage: {
      color: "white",
      position: "absolute",
      bottom: 0,
      textAlign: "center",
      backgroundColor: "#141414",
      opacity: 0.8,
      width: "100%",
      fontWeight: "bold",
    },
  });
  