import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, ImageBackground, StatusBar, SafeAreaView } from "react-native";
import { Title, Paragraph } from "react-native-paper";

const NewsDetailScreen = ({route, navigation}) => {
    const { item } = route.params;
    const onPress = () => {
        Linking.canOpenURL(item.url).then(supported => {
            if (supported) {
              Linking.openURL(item.url);
            } else {
              console.log("Don't know how to open URI: " + this.props.url);
            }
          });
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="transparent"
                barStyle={"dark-content"}
                showHideTransition={"fade"}
                hidden={false} />
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground source={{uri: item.urlToImage}} height="100%" width="100%" style={styles.imageBackground}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={require("../Assets/Icons/back.png")} style={styles.back}/>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{flex: 0.4, top:-20, backgroundColor:"#fff", borderRadius:30}}>
                    <View style={styles.content}>
                        <Title>{item.title}</Title>
                        <Paragraph style={styles.description}>{item.description}</Paragraph>
                        <Paragraph style={styles.description}>{item.content}</Paragraph>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={styles.texturl}>{item.url}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor:"#fff"
    },
    description: {
        paddingVertical:10
    },
    content: {
        padding:20
    },
    texturl: {
        color:"#5C5CFF"
    },
    back: {
        backgroundColor:"#fff",
        width:30,
        height: 30,
        borderRadius:20,
        margin:20
    },
    imageBackground: {
        flex: 10
    }
})

export default NewsDetailScreen;