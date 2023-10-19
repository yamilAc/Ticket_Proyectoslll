import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const apiUrl = 'http://192.168.1.21:3000'; // Update with your server URL

const EventForm = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // Fetch events when the component mounts
  useEffect(() => {
    axios.get(`${apiUrl}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const createEvent = () => {
    axios.post(`${apiUrl}/events`, {
      title,
      location,
      description,
    })
      .then((response) => {
        // Refresh the list of events
        axios.get(`${apiUrl}/events`)
          .then((response) => {
            setEvents(response.data);
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
          });

        // Clear input fields
        setTitle('');
        setLocation('');
        setDescription('');
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <View>
      <Text>Create Event</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Add Event" onPress={createEvent} />

      <Text>Event List:</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => (item.event_id ? item.event_id.toString() : 'defaultKey')}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.event_id} - {item.title} - {item.location} - {item.description}
            </Text>
          </View>
        )}
      />

    </View>
  );
};

export default EventForm;