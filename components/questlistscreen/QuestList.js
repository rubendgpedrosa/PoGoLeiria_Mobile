import combatPower from "../../library/combatPower";
import { Text, TouchableOpacity, Image, RefreshControl } from "react-native";
import { FlatList, Skeleton } from "native-base";
import { StyleSheet, View } from "react-native";

import QuestCard from "./QuestCard";

export default function QuestList(props) {
  return (
    <FlatList
      style={{
        width: "100%",
        paddingHorizontal: "2%",
      }}
      data={props.filteredQuests}
      refreshControl={
        <RefreshControl
          refreshing={props.isLoading}
          onRefresh={props.onRefresh}
        />
      }
      renderItem={({ item, index }) => (
        <QuestCard
          key={index}
          navigate={props.navigate}
          categoryColor={props.categoryColor}
          handleRewardImage={props.handleRewardImage}
          item={item}
          replace={item.quest_reward_type === "Pokemon" ? combatPower[item.quest_reward_pokemon_id].replace(/\,/g, "") : "x"+item.quest_reward_amount}
        ></QuestCard>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={() => (
        props.isLoading ? (
          <View>
            {[...Array(12)].map((_, i) => (
                <View key={i} style={styles.skeletonQuestCardItem}>
                        <Skeleton startColor="#141414" endColor="#292929" h="90" speed="0.75" />
                </View>
            ))}
          </View>
        ) : (
          <Text style={{ color: "#c0c0c0", alignSelf: "center" }}>No Results Found</Text>
        )
      )}
    />
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
    justifyContent: "center",
  },
  textPrimary: {
    fontSize: 16,
    paddingLeft: 20,
    paddingBottom: 0,
    marginBottom: 0,
    fontWeight: "bold",
    color: "#EEE5E9",
  },
  textSecondary: {
    fontSize: 13,
    opacity: 0.6,
    paddingLeft: 20,
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
  skeletonQuestCardItem: {
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
    overflow: 'hidden',
  },
});
