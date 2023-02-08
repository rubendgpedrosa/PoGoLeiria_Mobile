import { useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FilterContext } from '../store/FilterContext';

export default function TopbarFilter({}) {
    const { filter, setFilter } = useContext(FilterContext);

    const pokemon = require('../assets/pokemon.png');
    const items = require('../assets/items.png');
    const all = require('../assets/all.png');

    useEffect(() => {
        const retrieveFilter = async () => {
            try {
            const filter = await AsyncStorage.getItem('@filter');
            if (filter !== null) {
                setFilter(filter);
            }
        } catch (e) {
            console.error(e);
        }
        };
        retrieveFilter();
    }, []);

    const handleFilterLogo = () => {
        if (filter == "all") {
            return all;
        } else if (filter == "pokemon") {
            return pokemon;
        } else if (filter == "items") {
            return items;
        }
    }

    const toggleFilter = async () => {
        try {
            let filterToApply = ""
            if (filter == "all") {
                filterToApply = "pokemon";
            } else if (filter == "pokemon") {
                filterToApply = "items";
            } else if (filter == "items") {
                filterToApply = "all";
            }
            await AsyncStorage.setItem('@filter', filterToApply);
            setFilter(filterToApply);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View>
            <TouchableOpacity
                transparent
                onPress={() => toggleFilter()}
                title="Info"
                >
                    <Image source={handleFilterLogo()} color="#c0c0c0" style={{height: 32, width:32}} />
            </TouchableOpacity>
        </View>
        
    );
}