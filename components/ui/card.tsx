import { StyleSheet, View } from 'react-native';

export default function Card(props: { children: any }) {
    return <View style={styles.card}>{props.children}</View>;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
});
