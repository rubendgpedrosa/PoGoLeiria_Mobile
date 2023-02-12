import { MaterialIcons } from "@expo/vector-icons";
import { Input, Icon } from "native-base";
import {
    Dimensions,
    TouchableOpacity,
    View
} from "react-native";


export default function SearchInputField(props) {
    return (
        <View style={{
                width: Dimensions.get("window").width * 0.96,
                backgroundColor: "#141414",
                borderRadius: 50,
                marginBottom: 4,
            }}>
            <Input
            placeholder="Quest Name / Reward"
            borderRadius="4"
            py="3"
            px="1"
            variant={"unstyled"}
            fontSize="14"
            style={{
                color: "#c0c0c0",
            }}
            InputLeftElement={
                <Icon
                m="2"
                ml="3"
                size="6"
                color="#c0c0c0"
                as={<MaterialIcons name="search" />}
                />
            }
            onChangeText={(text) => props.setSearchTerm(text)}
            InputRightElement={
                props.searchTerm ? (
                <TouchableOpacity onPress={props.handleClearSearchTerm}>
                    <Icon
                    m="2"
                    mr="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="close" />}
                    />
                </TouchableOpacity>
                ) : null
            }
            value={props.searchTerm}
            />
        </View>
    );
}