import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

type ItemData = {
  point: number;
  lname: string;
  fname: string;
  id: string;
};
const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2:5001/score')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        const sortedData = result.sort(
          (a: ItemData, b: ItemData) => b.point - a.point,
        );
        setLeaderboardData(sortedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        setIsLoading(false);
      });
  }, [isLoading]);

  const renderItem = ({item}: {item: ItemData}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>
          {item.fname} {item.lname}
        </Text>
        <Text style={styles.score}>Score: {item.point}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.titleText}>Top Scorer</Text>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={isLoading}
        onRefresh={() => setIsLoading(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
    color: '#888',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Leaderboard;
