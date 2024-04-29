import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppRoute from './route'
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/es/integration/react";

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppRoute />
        </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({})