import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from "./Api";

export const NewsContext = createContext({});
 
export const useNews = () => useContext(NewsContext);

const Actions = {
    SET_DATA: 'SET_DATA',   
    LOADER: 'LOADER'
};

const initialState = {
    data: {},
    loading: false,
    errorMsg: ''
};

const reducer = (state, action) => {
    switch(action.type){
        case Actions.SET_DATA:
            return {
                ...state,
                data: {...action.payload},
                loading: false
            }
        case Actions.LOADER:
            return {
                ...state,
                loading:action.payload
            }
        default:
            return state;
    }
}

export const NewsDataProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        setNewsData()    
    }, [])

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            const json = jsonValue != null ? JSON.parse(jsonValue) : null;
            return json
        } catch (e) {
            // error reading value
        }
    }
      

    const setNewsData = async () => {
            let storageData = await getData();
            if(!storageData){
                dispatch({type: Actions.LOADER, payload: true})
                API.getNewsHeadlineByCountry()
                .then(response => {
                    storeData(response.data)
                    dispatch({type: Actions.SET_DATA, payload: response.data})
                })
                .catch(error => {
                    dispatch({type: Actions.LOADER, payload: false})
                })
        } else {
            dispatch({type: Actions.SET_DATA, payload:storageData })
        }
    }

    return (
        <NewsContext.Provider
            value={{
                ...state
            }}>
                {children}
        </NewsContext.Provider>
    )
}
