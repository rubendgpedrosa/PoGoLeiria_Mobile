import { MaterialIcons } from "@expo/vector-icons";
import { Input, Icon } from "native-base";
import {
    TouchableOpacity
} from "react-native";


export default function SearchInputField(props) {
    return (
        <Input
        placeholder="Quest Name / Reward"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
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
    );
}