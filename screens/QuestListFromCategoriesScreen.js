import { Divider } from "native-base";
import { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";

import pokestopImages from "../library/pokestopImages";
import axios from "axios";

import { FilterContext } from "../store/FilterContext";
import SearchInputField from "../components/questlistscreen/SearchInputField";
import QuestList from "../components/questlistscreen/QuestList";

export default function QuestCategoriesScreen({ route, navigation }) {
  const { categorySelected, categoryColor, selectedZone } = route.params;
  const [quests, setQuests] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { filter } = useContext(FilterContext);

  const filteredQuests = quests
    .filter(
      (quest) =>
        quest.quest_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        quest.quest_reward.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (quest) =>
        filter === "all" ||
        (filter === "pokemon" && quest.quest_reward_type === "Pokemon") ||
        (filter === "items" && quest.quest_reward_type !== "Pokemon")
    );

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  // Fetch data initially
  // https://raw.githubusercontent.com/rubendgpedrosa/PoGoLeiria_Data/main/catching.json
  // Make fetch request from url above and set the data to quests
  const getQuestsFromGithubRawFileByCategory = async () => {
    try {
      const response = await (async () => {
        let url = `https://pogoleiria-default-rtdb.europe-west1.firebasedatabase.app/${categorySelected.toLowerCase()}.json`;
        if (categorySelected.toLowerCase().includes("buddy")) {
          url = `https://pogoleiria-default-rtdb.europe-west1.firebasedatabase.app/buddy.json`;
        }
        let myHeaders = new Headers();
        myHeaders.set("Accept", "application/json");
        myHeaders.set("Content-Type", "application/json");
        myHeaders.set("Cache-Control", "no-cache, no-store, must-revalidate");
        myHeaders.set("Pragma", "no-cache");
        myHeaders.set("Expires", "0");
        const response = await axios
          .get(url, {
            method: "GET",
            headers: myHeaders,
          })
          .catch((error) => {
            console.log(error);
          });
        return response.data;
      })();

      let filteredResponse = [];
      if (response !== null && typeof response[0] === "object") {
        if (selectedZone === "leiria") {
          filteredResponse = response.map((task) => {
            return {
              ...task,
              pokestops: task.pokestops.filter(
                (pokestop) => !String(pokestop.longitude).startsWith("-8.9")
              ),
            };
          });
        }
        if (selectedZone === "marinha") {
          filteredResponse = response.map((task) => {
            return {
              ...task,
              pokestops: task.pokestops.filter((pokestop) =>
                String(pokestop.longitude).startsWith("-8.9")
              ),
            };
          });
        }
        filteredResponse = filteredResponse.filter(
          (task) => task.pokestops.length > 0
        );
      }

      setQuests(filteredResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRewardImage = (quest) => {
    if (quest.quest_reward_type === "Pokemon") {
      return pokestopImages(
        quest.quest_reward_pokemon_id.toString().padStart(3, "0")
      );
    } else if (quest.quest_reward_type === "Energy") {
      return pokestopImages(
        quest.quest_reward_pokemon_name.toLowerCase().replace(/\s/g, "") +
          quest.quest_reward_item_name.toLowerCase().replace(/\s/g, "")
      );
    } else {
      return pokestopImages(
        quest.quest_reward_item_name.toLowerCase().replace(/\s/g, "")
      );
    }
  };

  const onRefresh = useCallback(() => {
    setLoading(true);
    getQuestsFromGithubRawFileByCategory();
  }, []);

  useEffect(() => {
    getQuestsFromGithubRawFileByCategory();
  }, []);

  return (
    <View style={styles.scrollViewContainer}>
      <SearchInputField
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClearSearchTerm={handleClearSearchTerm}
      ></SearchInputField>
      <QuestList
        navigate={navigation.navigate}
        categoryColor={categoryColor}
        isLoading={isLoading}
        filteredQuests={filteredQuests}
        handleRewardImage={handleRewardImage}
        onRefresh={onRefresh}
      ></QuestList>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "4%",
    paddingBottom: "4%",
    backgroundColor: "#272727",
  },
});
