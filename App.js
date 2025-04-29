import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

export default function App() {
  const [trend, setTrend] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');

  const baseURL = 'https://trend-wars.onrender.com';

  useEffect(() => {
    fetch(`${baseURL}/trends/current`)
      .then(res => res.json())
      .then(data => setTrend(data))
      .catch(() => setTrend({ title: 'Fallback Trend', description: 'Show your best look!', endsIn: 3600 }));
  }, []);

  const handlePost = async () => {
    const payload = {
      caption,
      user_id: 'user123',
      trend_id: 'trend001'
    };

    try {
      const res = await fetch(`${baseURL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();
      setMessage('Post submitted successfully!');
      setCaption('');
    } catch {
      setMessage('Failed to submit post.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#000' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Trend Wars</Text>
      {trend && (
        <>
          <Text style={{ color: 'yellow', fontSize: 20, marginTop: 10 }}>{trend.title}</Text>
          <Text style={{ color: 'white', marginBottom: 10 }}>{trend.description}</Text>
        </>
      )}

      <Text style={{ color: 'white', marginTop: 20 }}>Your Caption:</Text>
      <TextInput
        value={caption}
        onChangeText={setCaption}
        placeholder="Write your caption..."
        placeholderTextColor="#ccc"
        style={{
          backgroundColor: '#222',
          color: 'white',
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity onPress={handlePost} style={{ backgroundColor: 'yellow', padding: 15, borderRadius: 10 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Submit Post</Text>
      </TouchableOpacity>

      {message !== '' && <Text style={{ color: 'white', marginTop: 20 }}>{message}</Text>}
    </ScrollView>
  );
}
