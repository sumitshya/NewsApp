import React from "react";
import { View, Text, StyleSheet, SafeAreaView, VirtualizedList, StatusBar } from "react-native";
import { Card, Title } from "react-native-paper";

import { useNews } from "../Context";


const getItemCount = (data) => data?.length;

const getItem = (data, index) => {
    return data[index]
} 

const HomeScreen = ({ navigation }) => {
    const {
        data
    } = useNews();

    const renderItem = ({item, index}) => {
       return (
            <Card style={styles.card} onPress={() => navigation.navigate('News', { item })}>
                <Card.Cover source={{ uri: item.urlToImage }} />
                <Card.Content style={styles.content}>
                    <Title style={styles.title}>{item.title}</Title>
                </Card.Content>
            </Card>
       )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                barStyle={"dark-content"}
                showHideTransition={"fade"}
                hidden={false} />
            {
                data?.articles &&
                <VirtualizedList
                    data={data?.articles}
                    initialNumToRender={data?.articles?.length}
                    renderItem={renderItem}
                    keyExtractor={item => item?.key}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 14, 
        lineHeight:20
    },
    card: {
        margin:20, 
        elevation: 3
    },
    content: {
        paddingTop:10
    }
})

export default HomeScreen;